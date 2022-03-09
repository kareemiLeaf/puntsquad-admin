import axios from "axios";
import PostPuntsTips from "common/PostPuntsTips";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "utils";
import { BASE_URL } from "utils/constants";

import styles from "./PostPuntsTip.module.scss";

function PostPuntsTip() {
  const history = useHistory();
  const userId = history?.location?.pathname?.split("/")?.[2];
  const userTypesArr = [
    { key: "All Users", endPoint: "users-list" },
    { key: "Top Users", endPoint: "top-users" },
    { key: "Puntsclub Users", endPoint: "top-punters" },
  ];
  const [isPunts, setPunts] = useState("top-punters");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    const config = {
      method: "get",
      url: `${BASE_URL}/top-punters`,
      headers: {
        Accept: "application/json",
        Authorization: await getToken(),
      },
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setData(response?.data?.results?.users);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const selUser = data?.find((item) => item?.userId === Number(userId));

  return (
    <div className={styles.PostPuntsTipWrapper}>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <div>
          <h3>Users</h3>
          <div className="d-flex align-items-center justify-content-between">
            {userTypesArr?.map((item) => (
              <p
                className={
                  isPunts === item?.endPoint ? styles.linksSel : styles.links
                }
                key={item?.key}
                onClick={() => {
                  history.push(`/users/${item?.endPoint}`);
                  setPunts(item?.endPoint);
                }}
              >
                {item?.key}
              </p>
            ))}
          </div>
        </div>
      </div>
      <PostPuntsTips styles={styles} user={selUser} fetching={loading} />
    </div>
  );
}

export default PostPuntsTip;
