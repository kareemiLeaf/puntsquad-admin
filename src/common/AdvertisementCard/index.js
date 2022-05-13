import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./AdvertisementCard.module.scss";

function AdvertisementCard({ data, refetch }) {
  const [loading, setLoading] = useState(false);
  const deleteAd = async () => {
    setLoading(true);
    console.log("ID", data);
    const body = {
      advertisement_id: data?.id,
    };
    const config = {
      method: "post",
      url: `${BASE_URL}/${"delete-advertisement"}`,
      headers: {
        Authorization: await getToken(),
      },
      data: body,
    };

    axios(config)
      .then(function (response) {
        refetch();
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className={styles.PlayerCardWrapper}>
      <div className={styles.imageWrap}>
        <img src={data?.advertisementImage} alt="tip-image" />
      </div>
      <p className={styles.timer}>{data?.advertisementExpiry}</p>
      <p className={styles.remain}>Remaining</p>
      <Button
        shape="round"
        className={styles.btn}
        onClick={deleteAd}
        loading={loading}
        disabled={loading}
      >
        {"Delete Advertisement"}
      </Button>
    </div>
  );
}

export default AdvertisementCard;
