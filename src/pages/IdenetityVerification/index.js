import { Empty } from "antd";
import axios from "axios";
import Loader from "common/Loader";
import VerificationComponent from "common/VerificationComponent";
import { useEffect, useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./IdenetityVerification.module.scss";

function IdenetityVerification() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const getIdentyVerification = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/pending-verifications`,
      headers: {
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setResult(response?.data?.results?.Pending);
      })
      .catch(function (error) {
        setLoading(false);

        console.log(error);
      });
  };

  useEffect(() => {
    getIdentyVerification();
  }, []);
  return (
    <div className={styles.IdenetityVerificationWrapper}>
      <div className="d-flex">
        <h4>Identity Verification</h4>
        <h4 className="mx-5">{result?.length || 0} Pending</h4>
      </div>
      {loading && <Loader />}
      {result?.map((item) => (
        <VerificationComponent
          key={item?.id}
          data={item}
          refetch={getIdentyVerification}
        />
      ))}
      {!loading && result?.length === 0 ? <Empty /> : <span />}
    </div>
  );
}

export default IdenetityVerification;
