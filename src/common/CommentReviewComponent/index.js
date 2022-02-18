import { Button, Col, Rate, Row } from "antd";

import styles from "./CommentReviewComponent.module.scss";

function CommentReviewComponent({ isLast = false, showRating = false, data }) {
  console.log("ISLAST", data);
  return (
    <div className={styles.CommentReviewComponentWrapper}>
      <Row
        align="middle"
        justify="space-between"
        gutter={15}
        className="px-3 py-3"
      >
        <Col span={16}>
          <Row justify="space-between">
            <Col span={2}>
              <div className={styles.imgWrap}>
                <img
                  src={
                    showRating
                      ? data?.review_user_image
                      : data?.commented_user_image
                  }
                  alt="player-img"
                />
              </div>
            </Col>
            <Col span={21}>
              <p className={styles.title}>
                {showRating ? data?.review_user_name : data?.feed_title}
              </p>
              <p className={styles.desc}>
                {showRating ? data?.review : data?.comment}
              </p>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          {showRating && (
            <div className="d-flex w-100 justify-content-center">
              <Rate disabled defaultValue={data?.rating} />
            </div>
          )}
        </Col>
        <Col span={4}>
          <div className="d-flex w-100 justify-content-center">
            <Button type="text" className="text-white">
              Delete
            </Button>
          </div>
        </Col>
      </Row>

      {!isLast && <hr />}
    </div>
  );
}

export default CommentReviewComponent;
