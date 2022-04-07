import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, Empty, message, Row } from "antd";
import confirm from "antd/lib/modal/confirm";
import axios from "axios";
import Loader from "common/Loader";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./Report.module.scss";

function Report() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getReport = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/reports`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(response?.data?.results?.report);
        setResult(response?.data?.results?.report);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        message?.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getReport();
  }, []);
  const [selected, setSelected] = useState(0);
  const ReportSideComponent = ({ isNew = false, index, data }) => (
    <div
      className={isNew ? styles.bg1 : styles.bg2}
      onClick={() => setSelected(index)}
    >
      <div className="d-flex pt-2 px-2">
        <div className={styles.imgWrap}>
          <img src={data?.commentedUserImage} alt="img" />
        </div>
        <div className="px-3">
          <div className="d-flex align-items-center">
            <p className={styles.name}>@{data?.commentedUser}</p>
            {isNew && <div className={styles.blue} />}
          </div>
          <p className={styles.content}>{data?.reportedComment}</p>
        </div>
      </div>
    </div>
  );
  const commentData = result?.[selected];

  const handleClick = async (type) => {
    const body =
      type === 0
        ? { report_id: commentData?.reportID }
        : { user_id: commentData?.commentedUserID };
    const config = {
      method: "post",
      url:
        type === 0 ? `${BASE_URL}/dismiss-claim` : `${BASE_URL}/delete-account`,
      headers: {
        Authorization: await getToken(),
      },
      data: body,
    };

    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <span>
          Are you sure, you want to {type === 0 ? "Dismiss" : "Delete"} claim?
        </span>
      ),
      onOk() {
        axios(config)
          .then(function (response) {
            console.log(response.data);
            getReport();
          })
          .catch(function (error) {
            console.log(error);
            message.error("something went wrong");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className={styles.ReportWrapper}>
      <div className="d-flex">
        <h4>Reports</h4>
        <h4 className="mx-5">{result?.length || 0} Pending</h4>
      </div>

      {loading && <Loader />}
      {!loading && result?.length ? (
        <Row className={styles.wrapper}>
          <Col span={5} className={styles.col1}>
            {result?.map((item, i) => (
              <ReportSideComponent
                isNew={selected !== i}
                data={item}
                key={item?.reportID}
                index={i}
              />
            ))}
          </Col>
          <Col span={19} className={styles.col2}>
            <div className="d-flex p-2">
              <div className={styles.imgWrap}>
                <img src={commentData?.commentedUserImage} alt="img" />
              </div>
              <div className="px-3">
                <div className="d-flex align-items-center">
                  <p className={styles.name}>@{commentData?.commentedUser}</p>
                </div>
                <p className={styles.content}>Total Reports: 0</p>
              </div>
            </div>
            <hr />

            <div className={styles.dateWrap}>
              <hr />
              <p className={styles.date}>{commentData?.created_at}</p>
            </div>

            <div className="d-flex px-2 my-4">
              <div className={styles.imgWrap}>
                <img src={commentData?.commentedUserImage} alt="img" />
              </div>
              <div className="px-3">
                <div className="d-flex align-items-center">
                  <p className={styles.name}>
                    Commented on {commentData?.CommentedOn}
                  </p>
                </div>
                <p className={styles.content}>
                  {commentData?.commentedUser} Wrote:{" "}
                  {commentData?.reportedComment}
                </p>
              </div>
            </div>
            <div className={styles.btnWrap}>
              <Button type="text" onClick={() => handleClick(0)}>
                Dismiss claim
              </Button>
              <Button type="text" onClick={() => handleClick(1)}>
                Delete Account
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <Empty />
      )}
    </div>
  );
}

export default Report;
