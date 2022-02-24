import { Avatar } from "antd";
import { useHistory } from "react-router-dom";

import styles from "./UserCard.module.scss";

function UserCard({ data }) {
  const history = useHistory();
  return (
    <div
      className={styles.UserCardWrapper}
      onClick={() => history.push(`/user-details/${data?.userId}`)}
    >
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
