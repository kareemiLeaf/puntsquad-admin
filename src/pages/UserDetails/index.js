import { MoreOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import back from "assets/back-filled.png";
import clock from "assets/clock.png";
import axios from "axios";
import CommentReviewComponent from "common/CommentReviewComponent";
import Loader from "common/Loader";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./UserDetails.module.scss";

function UserDetails() {
  const history = useHistory();
  const id = history?.location?.pathname?.split("/")?.[2];
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const [comments, setComments] = useState(null);
  const [reviews, setReviews] = useState(null);

  const getUserDetails = async () => {
    setLoading(true);
    const data = { user_id: id };
    const config = {
      method: "post",
      url: `${BASE_URL}/user-details`,
      headers: {
        Authorization: await getToken(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(response.data);
        setResult(response?.data?.results?.profiles?.[0]);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const getComments = async () => {
    setFetching(true);
    const data = { user_id: id };
    const config = {
      method: "post",
      url: `${BASE_URL}/user-comments`,
      headers: {
        Authorization: await getToken(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFetching(false);
        console.log(response.data);
        setComments(response?.data?.results?.comments);
      })
      .catch(function (error) {
        setFetching(false);
        console.log(error);
      });
  };

  const getReviews = async () => {
    setLoading(true);
    const data = { user_id: id };
    const config = {
      method: "post",
      url: `${BASE_URL}/user-reviews`,
      headers: {
        Authorization: await getToken(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setFetching(false);
        console.log(response.data);
        setReviews(response?.data?.results?.reviews);
      })
      .catch(function (error) {
        setFetching(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getUserDetails();
    getComments();
    getReviews();
  }, []);

  return (
    <div className={styles.UserDetailsWrapper}>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <div
          className="d-flex align-items-center pointer"
          onClick={() => history.goBack()}
        >
          <img src={back} alt="back" className={styles.backArrow} />
          <p className={styles.back}>All Users</p>
        </div>
        <div>
          <MoreOutlined />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex align-items-center py-4">
            <div className="position-relative">
              <Avatar size={80} shape="circle" src={result?.image} />
              <div className={styles.status} />
            </div>
            <div className="px-3">
              <p className={styles.name}>{result?.userName}</p>
              <p className={styles.email}>{result?.email}</p>
            </div>

            <Row gutter={20} className="px-5 mx-5">
              <Col>
                <p className={styles.counts}>{result?.followers}</p>
                <p className={styles.countText}>Followers</p>
              </Col>
              <Col>
                <p className={styles.counts}>{result?.followings}</p>
                <p className={styles.countText}>Following</p>
              </Col>
              <Col>
                <p className={styles.counts}>{result?.rating}</p>
                <p className={styles.countText}>Rating</p>
              </Col>
            </Row>
          </div>
          <p className={styles.back}>Profile</p>
          <Row align="center" gutter={15} className="py-4">
            <Col xs={20}>
              <Row gutter={20}>
                <Col className="d-flex">
                  <img src={clock} className={styles.clock} />
                  <div>
                    <p className={styles.profileTitle}>{result?.JoiningDate}</p>
                    <p className={styles.profileText}>Date of signup</p>
                  </div>
                </Col>
                <Col className="d-flex">
                  <img src={clock} className={styles.clock} />
                  <div>
                    <p className={styles.profileTitle}>$22,043</p>
                    <p className={styles.profileText}>Total Earn</p>
                  </div>
                </Col>
                <Col className="d-flex">
                  <img src={clock} className={styles.clock} />
                  <div>
                    <p className={styles.profileTitle}>{result?.BSB}</p>
                    <p className={styles.profileText}>BSB</p>
                  </div>
                </Col>
                <Col className="d-flex">
                  <img src={clock} className={styles.clock} />
                  <div>
                    <p className={styles.profileTitle}>
                      {result?.Account_number}
                    </p>
                    <p className={styles.profileText}>Account Number</p>
                  </div>
                </Col>
                <Col className="d-flex">
                  <img src={clock} className={styles.clock} />
                  <div>
                    <p className={styles.profileTitle}>
                      {result?.phone_number}
                    </p>
                    <p className={styles.profileText}>Phone Number</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={4}>
              <Row gutter={10}>
                <Col>
                  <button className={styles.pro} disabled>
                    Pro Account
                  </button>
                </Col>
                <Col>
                  <button className={styles.edit} disabled>
                    Edit
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <p className={styles.back}>Users Bio</p>
          <p className="px-2 py-3 mb-2">{result?.bio}</p>
        </>
      )}

      <hr />
      <p className={styles.back}>Comment Stream</p>
      <br />

      {fetching ? (
        <Loader />
      ) : (
        comments?.map((item, i) => (
          <CommentReviewComponent
            key={i}
            isLast={comments?.length === i + 1}
            data={item}
            refetch={getComments}
          />
        ))
      )}
      {!fetching && comments?.length === 0 && (
        <p className="text-center">No Comments</p>
      )}
      <hr />
      <p className={styles.back}>Review & Rating</p>
      <br />
      {fetching ? (
        <Loader />
      ) : (
        reviews?.map((item, i) => (
          <CommentReviewComponent
            key={i}
            isLast={reviews.length === i + 1}
            showRating={true}
            data={item}
            refetch={getReviews}
          />
        ))
      )}
      {!fetching && reviews?.length === 0 && (
        <p className="text-center">No Reviews</p>
      )}
    </div>
  );
}

export default UserDetails;
