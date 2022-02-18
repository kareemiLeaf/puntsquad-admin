import { Button } from "antd";

import styles from "./PlayerCard.module.scss";

function PlayerCard({ article = false, data }) {
  return (
    <div className={styles.PlayerCardWrapper}>
      <p className={styles.title}>{article ? data?.feedTitle : data?.title}</p>
      <div className={styles.imageWrap}>
        <img
          src={article ? data?.feedImage : data?.feed_images?.image}
          alt="tip-image"
        />
      </div>
      <p className={styles.timer}>4hrs 22mins</p>
      <p className={styles.remain}>Remaining</p>
      <Button shape="round" className={styles.btn}>
        {article ? "Delete News" : "Delete Tip"}
      </Button>
    </div>
  );
}

export default PlayerCard;
