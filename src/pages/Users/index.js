import { Col, Row } from "antd";
import axios from "axios";
import Loader from "common/Loader";
import PlayerCard from "common/PlayerCard";
import UserCard from "common/UserCard";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./Users.module.scss";

function Users() {
  const history = useHistory();
  const type = history?.location?.pathname?.split("/")?.[2] || "";
  const [loading, setLoading] = useState(false);
  const userTypesArr = [
    { key: "All Users", endPoint: "users-list" },
    { key: "Top Users", endPoint: "top-users" },
    { key: "Puntsclub Users", endPoint: "top-punters" },
  ];
  const [data, setData] = useState([]);
  const [isPunts, setPunts] = useState(type ? type : "users-list");
  const getUsers = async (endPoint = type ? type : "users-list") => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/${endPoint}`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setData(response?.data?.results?.users);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const [result, setResult] = useState([]);
  const [tipsLoading, setTipsLoading] = useState(false);

  const getTips = async () => {
    setTipsLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/club-feeds`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setTipsLoading(false);
        setResult(response.data?.results?.Feed);
      })
      .catch(function (error) {
        setTipsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
    getTips();
  }, []);

  return (
    <div className={styles.UsersWrapper}>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div>
          <h3>Users</h3>
          <div className="d-flex align-items-center justify-content-between">
            {userTypesArr?.map((item) => (
              <p
                className={
                  isPunts === item?.endPoint ? styles.linksSel : styles.links
                }
                key={item?.key}
                onClick={() => {
                  setPunts(item?.endPoint);
                  getUsers(item?.endPoint);
                }}
              >
                {item?.key}
              </p>
            ))}
          </div>
        </div>
        {isPunts === "top-punters" && (
          <div
            className={styles.searchWrap}
            onClick={() => history.push("/new-punts-user")}
          >
            Add New Puntsclub User
          </div>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Row gutter={10}>
          {data?.map((item) => (
            <Col xs={6} key={item?.id}>
              <UserCard data={item} isPunts={isPunts === "top-punters"} />
            </Col>
          ))}
        </Row>
      )}
      {isPunts === "top-punters" &&
        (tipsLoading ? (
          <Loader />
        ) : (
          <>
            <h5 className="text-white mb-2 mt-5">Live Puntsclub posts</h5>
            <Row className="mt-4" gutter={20}>
              {result?.map((item) => (
                <Col key={item?.id} className="mb-3">
                  <PlayerCard data={item} refetch={getTips} punts={true} />
                </Col>
              ))}
            </Row>
          </>
        ))}
    </div>
  );
}

export default Users;
