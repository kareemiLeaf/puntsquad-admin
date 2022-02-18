import { Avatar } from "antd";
import { useHistory } from "react-router-dom";

import styles from "./UserCard.module.scss";

function UserCard({ data }) {
  const history = useHistory();
  console.log("data", data);
  return (
    <div
      className={styles.UserCardWrapper}
      onClick={() => history.push(`/user-details/${data?.id}`)}
    >
      <div>
        <Avatar
          size={80}
          shape="circle"
          src="https://i.insider.com/5f6096fc57b7da001ee11943?width=700"
        />
        <div className={styles.status} />
      </div>
      <div>
        <p className={styles.name}>
          {data?.first_name}&nbsp;{data?.last_name}
        </p>
        <p className={styles.email}>{data?.email}</p>
        <p className={styles.name}>235k followers</p>
      </div>
    </div>
  );
}

export default UserCard;
