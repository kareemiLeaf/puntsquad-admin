import { Col, Row } from "antd";
import searchIcon from "assets/search.png";
import axios from "axios";
import Loader from "common/Loader";
import UserCard from "common/UserCard";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./Users.module.scss";

function Users() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getUsers = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/user`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setData(response?.data?.results);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.UsersWrapper}>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div>
          <h3>Users</h3>
          <div className="d-flex align-items-center justify-content-between">
            <p className={styles.links}>All Users</p>
            <p className={styles.links}>Top Users</p>
            <p className={styles.links}>Puntclub Users</p>
          </div>
        </div>
        <div className={styles.searchWrap}>
          <img src={searchIcon} />
          <input placeholder="Search" />
        </div>
      </div>
      {loading && <Loader />}
      <Row gutter={10}>
        {data?.map((item) => (
          <Col xs={6} key={item?.id}>
            <UserCard data={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Users;
