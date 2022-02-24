import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Col, Image, message, Popover, Row, Space, Spin } from "antd";
import confirm from "antd/lib/modal/confirm";
import axios from "axios";
import { useState } from "react";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./VerificationComponent.module.scss";

function VerificationComponent({ data, refetch }) {
  const [loading, setLoading] = useState(false);
  const emptyImg =
    "https://www.sustainablewoodstock.org/wp-content/themes/theron-lite.2.0/theron-lite/images/blank_img.png";

  const handleAcceptReject = async (type) => {
    setLoading(true);
    const body = {
      user_id: data?.user_id,
    };
    const config = {
      method: "post",
      url: type === 1 ? `${BASE_URL}/verify-id` : `${BASE_URL}/reject-id`,
      headers: {
        Authorization: await getToken(),
      },
      data: body,
    };

    axios(config)
      .then(function () {
        message.success(
          type === 1 ? "Verification success" : "Rejected the identification"
        );
        setLoading(false);
        refetch();
      })
      .catch(function (error) {
        setLoading(false);
        message.error(error?.message);
      });
  };

  const content = (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div>
        <p className="mb-0">Account Name:</p>
        <p className="text-center">
          {data?.user_details?.[0]?.account_name || "Nill"}
        </p>
      </div>
      <div className="my-1">
        <p className="mb-0">Account No:</p>
        <p className="text-center">
          {data?.user_details?.[0]?.account_number || "Nill"}
        </p>
      </div>
    </div>
  );
  return (
    <div className={styles.VerificationComponentWrapper}>
      <Row gutter={15}>
        <Col>
          <div className={styles.imgWrap}>
            <img src={data?.user_image || emptyImg} alt="img" />
          </div>
        </Col>
        <Col>
          <p className={styles.date}>{data?.created_at}</p>
          <p className={styles.username}>{data?.user_name}</p>
          <Row
            className="my-3"
            align="middle"
            justify="space-between"
            gutter={10}
          >
            <Col>
              <div className={styles.idImgWrap}>
                <Image
                  height={150}
                  width={200}
                  src={data?.user_details?.[0]?.photo_id || emptyImg}
                />
              </div>
            </Col>
            {data?.user_details?.[0]?.photo_id2 && (
              <Col>
                <div className={styles.idImgWrap}>
                  <Image
                    height={150}
                    width={200}
                    src={data?.user_details?.[0]?.photo_id2 || emptyImg}
                  />
                </div>
              </Col>
            )}
            {data?.user_details?.[0]?.id_front && (
              <Col>
                <div className={styles.idImgWrap}>
                  <Image
                    height={150}
                    width={200}
                    src={data?.user_details?.[0]?.id_front || emptyImg}
                  />
                </div>
              </Col>
            )}
            {data?.user_details?.[0]?.id_back && (
              <Col>
                <div className={styles.idImgWrap}>
                  <img
                    alt="user-detail"
                    src={data?.user_details?.[0]?.id_back || emptyImg}
                  />
                </div>
              </Col>
            )}

            {data?.user_details?.[0] && (
              <Popover content={content} title="Details" placement="bottom">
                <Col>
                  <div className={styles.idImgWrap}>
                    <div className={styles.accountWrapper}>
                      <div>
                        <p>Account Name:</p>
                        <p>{data?.user_details?.[0]?.account_name || "Nill"}</p>
                      </div>
                      <div className="my-1">
                        <p>Account No:</p>
                        <p>
                          {data?.user_details?.[0]?.account_number || "Nill"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Popover>
            )}

            <Col className="p-2">
              {loading ? (
                <Spin />
              ) : (
                <Space direction="vertical">
                  <CheckCircleOutlined
                    className="pointer"
                    onClick={() =>
                      confirm({
                        icon: <ExclamationCircleOutlined />,
                        content: <p>Are you sure to verify this identity?</p>,
                        onOk() {
                          handleAcceptReject(1);
                        },
                        onCancel() {
                          console.log("Cancel");
                        },
                      })
                    }
                  />
                  <MinusCircleOutlined
                    className="pointer"
                    onClick={() =>
                      confirm({
                        icon: <ExclamationCircleOutlined />,
                        content: <p>Are you sure to Reject this identity?</p>,
                        onOk() {
                          handleAcceptReject(0);
                        },
                        onCancel() {
                          console.log("Cancel");
                        },
                      })
                    }
                  />
                </Space>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default VerificationComponent;
