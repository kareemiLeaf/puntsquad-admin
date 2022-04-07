import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, message, Modal } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./UserCard.module.scss";

function UserCard({ data, isPunts, isNav = false }) {
  const history = useHistory();

  const handleSubmit = () => {
    Modal.confirm({
      title: "Confirm",
      icon: <DeleteOutlined />,
      content: `Are you to Delete Punt user ${data?.userName}?`,
      okText: "Sure",
      cancelText: "Cancel",
      onOk: () => {
        const data1 = { user_id: data?.userId };
        const config = {
          method: "post",
          url: `${BASE_URL}/delete-user`,
          headers: {
            Accept: "application/json",
            Authorization: getToken(),
          },
          data: data1,
        };

        axios(config)
          .then(function () {
            message.success(`${data?.userName} user is deleted successfully`);
            history.push(`/users/top-punters`);
            window.location.reload(true);
          })
          .catch(function (error) {
            console.log(error);
            message.error(error?.response?.data?.message);
          });
      },
    });
  };

  return (
    <div
      className={styles.UserCardWrapper}
      onClick={() =>
        !isNav
          ? isPunts
            ? history.push(`/post-punts-tips/${data?.userId}`)
            : history.push(`/user-details/${data?.userId}`)
          : {}
      }
    >
      {!isNav && isPunts ? (
        <div
          className={styles.delete}
          onClick={(e) => {
            e?.stopPropagation();
            handleSubmit();
          }}
        >
          <EllipsisOutlined />
        </div>
      ) : (
        <span />
      )}
      <div>
        <Avatar size={80} shape="circle" src={data?.image} />
        {data?.active ? <div className={styles.status} /> : null}
      </div>
      <div className="px-2">
        <p className={styles.name}>{data?.userName || "Nil"}</p>
        <p className={styles.email}>{data?.email}</p>
        <p className={styles.name}>{data?.followers || 0} followers</p>
      </div>
    </div>
  );
}

export default UserCard;
