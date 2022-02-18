import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Progress } from "antd";
import clock from "assets/grey-clock.png";

import styles from "./EventComponent.module.scss";

function EventComponent({ data }) {
  return (
    <div className={styles.EventComponentWrapper}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className={styles.dot} />
          <p className={styles.title}>#{data?.trending_hashtag}</p>
        </div>
        <div className="pointer">
          <EllipsisOutlined />
        </div>
      </div>
      <p className={styles.tips}>{data?.count}k tips</p>
      <div className="d-flex align-items-center">
        <img src={clock} alt="clock" className={styles.clock} />
        <p className={styles.title}>Complete in 4 days</p>
      </div>
      <Progress
        strokeColor="#a5a5a5"
        trailColor="#1e1c3a"
        percent={data?.count}
        showInfo={false}
      />

      <Avatar.Group className="mt-2 py-2">
        <Avatar
          src="https://randomuser.me/api/portraits/men/63.jpg"
          className="bg-white"
        />
        <Avatar
          src="https://randomuser.me/api/portraits/men/27.jpg"
          className="bg-white"
        />
        <Avatar
          src="https://randomuser.me/api/portraits/men/14.jpg"
          className="bg-white"
        />
        <Avatar
          src="https://randomuser.me/api/portraits/men/64.jpg"
          className="bg-white"
        />
      </Avatar.Group>
    </div>
  );
}

export default EventComponent;
