import { Col, message, Row } from "antd";
import add from "assets/add.png";
import axios from "axios";
import EventComponent from "common/EventComponent";
import Loader from "common/Loader";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./TrendingEvents.module.scss";

function TrendingEvents() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const getEvents = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/trending-hashtags`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setResult(response?.data?.results);
      })
      .catch(function (error) {
        setLoading(false);
        message.error(error?.response?.message);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className={styles.TrendingEventsWrapper}>
      <h4>Trending Events</h4>
      <div className={styles.addBtn}>
        <img src={add} alt="add" />
        <p>Add new event</p>
      </div>

      {loading && <Loader />}

      <Row gutter={15}>
        {result?.map((item) => (
          <Col span={6} key={item?.id}>
            <EventComponent data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default TrendingEvents;
