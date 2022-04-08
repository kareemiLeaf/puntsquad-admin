import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./PlayerCard.module.scss";

function PlayerCard({
  article = false,
  data,
  refetch,
  punts = false,
  tip = false,
}) {
  const [loading, setLoading] = useState(false);
  const deleteTip = async () => {
    setLoading(true);
    const body = tip
      ? {
          tip_id: data?.id,
        }
      : article
      ? {
          news_id: data?.id,
        }
      : {
          feed_id: data?.feedId,
        };
    const config = {
      method: "post",
      url: `${BASE_URL}/${
        punts ? "delete-puntclub-feed" : article ? "delete-news" : "delete-tip"
      }`,
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
      {article ? <p className={styles.title1}>{data?.feedTitle}</p> : ""}
      <div className={styles.imageWrap}>
        <img
          src={
            tip
              ? data?.feedImage
              : article
              ? data?.feedImage
              : data?.feedImages?.[0]
          }
          alt="tip-image"
        />
      </div>
      {tip ? <p className={styles.title}>{data?.feedTitle}</p> : ""}
      {punts ? (
        <>
          <p className={styles.title}>
            {article ? data?.feedTitle : data?.feedTitle}
          </p>
          <p className={styles.name}>Posted by @ {data?.userName}</p>
        </>
      ) : (
        ""
      )}
      <p className={styles.timer}>
        {tip || punts ? `${data?.feedExpiry} Remaining` : data?.feedExpiry}
      </p>
      {article ? <p className={styles.remain}>Remaining</p> : <p> </p>}
      <Button
        shape="round"
        className={styles.btn}
        onClick={deleteTip}
        loading={loading}
        disabled={loading}
      >
        {article ? "Delete Article" : "Delete Tip"}
      </Button>
    </div>
  );
}

export default PlayerCard;
