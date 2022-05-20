import { Col, message, Row } from "antd";
import axios from "axios";
import AdvertisementCard from "common/AdvertisementCard";
import AdvertisingComponent from "common/AdvertisingComponent";
import Loader from "common/Loader";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./Advertising.module.scss";

function Advertising() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getAds = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/list-advertisement`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        setResult(response.data?.results?.advertisement);
      })
      .catch(function () {
        setLoading(false);
        message.error("something went wrong");
      });
  };

  console.log("result", result);

  useEffect(() => {
    getAds();
  }, []);
  return (
    <div className={styles.NewsWrapper}>
      <h4 className="mt-3">Advertising</h4>
      <AdvertisingComponent styles={styles} getAds={getAds} />
      {loading ? (
        <Loader />
      ) : (
        <Row className="mt-4" gutter={20}>
          {result?.map((item) => (
            <Col key={item?.id}>
              <AdvertisementCard data={item} refetch={getAds} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Advertising;
