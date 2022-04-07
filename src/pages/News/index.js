import { Col, message, Row } from "antd";
import axios from "axios";
import AddNewsComponent from "common/AddNewsComponent";
import Loader from "common/Loader";
import PlayerCard from "common/PlayerCard";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./News.module.scss";

function News() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getNews = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/list-news`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        setResult(response.data?.results?.newsFeeds);
      })
      .catch(function () {
        setLoading(false);
        message.error("something went wrong");
      });
  };

  console.log("result", result);

  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className={styles.NewsWrapper}>
      <h4 className="mt-3">News</h4>
      <AddNewsComponent styles={styles} getNews={getNews} />
      {loading ? (
        <Loader />
      ) : (
        <Row className="mt-4" gutter={20}>
          {result?.map((item) => (
            <Col key={item?.id}>
              <PlayerCard article={true} data={item} refetch={getNews} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default News;
