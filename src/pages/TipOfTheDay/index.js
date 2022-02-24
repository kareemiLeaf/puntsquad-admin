import { Col, Row } from "antd";
import axios from "axios";
import AddTipsComponent from "common/AddTipsComponent";
import Loader from "common/Loader";
import PlayerCard from "common/PlayerCard";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./TipOfTheDay.module.scss";

function TipOfTheDay() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const getTips = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/web-feeds`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setResult(response.data?.results?.Feeds);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const [fetching, setFetching] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setFetching(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/top-punters`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setFetching(false);
        setUsers(response?.data?.results?.users);
      })
      .catch(function (error) {
        setFetching(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getTips();
    getUsers();
  }, []);

  return (
    <div className={styles.TipOfTheDayWrapper}>
      <h4 className="mt-3">Tip of the day</h4>
      <AddTipsComponent
        styles={styles}
        getTips={getTips}
        users={users}
        fetching={fetching}
      />

      {loading ? (
        <Loader />
      ) : (
        <Row className="mt-4" gutter={20}>
          {result?.map((item) => (
            <Col key={item?.id} className="mb-3">
              <PlayerCard data={item} refetch={getTips} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default TipOfTheDay;
