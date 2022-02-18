import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Rate, Row } from "antd";
import axios from "axios";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./CommentReviewComponent.module.scss";

function CommentReviewComponent({
  isLast = false,
  showRating = false,
  data,
  refetch,
}) {
  const handleDelete = async (type) => {
    const body =
      type === 1
        ? { comment_id: data?.comment_id }
        : { review_id: data?.review_id };
    const endPoint = type === 1 ? "comment-delete" : "review-delete";

    const config = {
      method: "post",
      url: `${BASE_URL}/${endPoint}`,
      headers: {
        Authorization: await getToken(),
      },
      data: body,
    };

    axios(config)
      .then(function () {
        message.success(
          `${type === 1 ? "Comment" : "Review"} successfully deleted`
        );
        refetch();
      })
      .catch(function (error) {
        message?.error(error?.response?.data);
      });
  };
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
            <Button
              type="text"
              className="text-white"
              onClick={() => {
                // Modal.warning({
                //   title: `Delete ${showRating ? "Review" : "Comment"}`,
                //   content: `Are you sure, you want to delete this  ${
                //     showRating ? "Review" : "Comment"
                //   }?`,
                //   okText: "Sure",
                //   cancelText: "No",
                //   onOk: () => handleDelete(showRating ? 0 : 1),
                //   onCancel: () => {},
                //   can
                // });
                Modal.confirm({
                  title: `Confirm Delete ${showRating ? "Review" : "Comment"}`,
                  icon: <ExclamationCircleOutlined />,
                  content: `Are you sure, you want to delete this  ${
                    showRating ? "Review" : "Comment"
                  }?`,
                  okText: "Sure",
                  cancelText: "Cancel",
                  onOk: () => handleDelete(showRating ? 0 : 1),
                  onCancel: () => {},
                });
              }}
            >
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
