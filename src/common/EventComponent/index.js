import { EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, message, Modal, Progress } from "antd";
import clock from "assets/grey-clock.png";
import axios from "axios";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./EventComponent.module.scss";

function EventComponent({ data, refetch }) {
  const menu = (
    <Menu onClick={() => handleMenuClick()}>
      <Menu.Item>Delete</Menu.Item>
    </Menu>
  );

  const handleMenuClick = () => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure, you want to delete this Hash Event?",
      okText: "Sure",
      cancelText: "Cancel",
      onOk: () => onDelete(),
    });
  };

  const onDelete = async () => {
    const body = {
      hashtag_id: data?.id,
    };
    const config = {
      method: "post",
      url: `${BASE_URL}/delete-hashtag`,
      headers: {
        Authorization: await getToken(),
      },
      data: body,
    };

    axios(config)
      .then(function () {
        refetch();
        message.success("Events deleted succesfully");
        Modal.destroyAll();
      })
      .catch(function () {
        message.error("Something went wrong");
      });
  };
  return (
    <div className={styles.EventComponentWrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className={styles.dot} />
          <p className={styles.title}>#{data?.trending_hashtag}</p>
        </div>
        <div className="pointer">
          <Dropdown overlay={menu}>
            <EllipsisOutlined />
          </Dropdown>
        </div>
      </div>
      <p className={styles.tips}>{data?.count} tips</p>
      <div className="d-flex align-items-center">
        <img src={clock} alt="clock" className={styles.clock} />
        <p className={styles.title}>Complete in {data?.Expiry || 0} </p>
      </div>
      <Progress
        strokeColor="#a5a5a5"
        trailColor="#1e1c3a"
        percent={data?.Expiry < 100 ? data?.Expiry : 100 - data?.Expiry}
        showInfo={false}
      />

      <Avatar.Group className="mt-2 py-2">
        {data?.user_images?.slice(0, 4)?.map((item, i) => (
          <Avatar key={i} src={item} className="bg-white" />
        ))}
      </Avatar.Group>
    </div>
  );
}

export default EventComponent;
