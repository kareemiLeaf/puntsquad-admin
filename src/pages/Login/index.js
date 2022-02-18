import { Button, message } from "antd";
import logo from "assets/logo.png";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "utils/constants";

import styles from "./Login.module.scss";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setLoading(true);
    const data = {
      email,
      password,
    };
    const config = {
      method: "post",
      url: `${BASE_URL}/web-login`,
      data,
    };

    axios(config)
      .then(function (response) {
        message.success("Login Success");
        setLoading(false);
        localStorage.setItem("PUNTS_TOKEN", response?.data?.results);
        history.push("/users");
      })
      .catch(function (error) {
        setLoading(false);
        message.error(
          error?.response?.data?.message?.[0] || "Invalid Credentials"
        );
      });
  };

  return (
    <div className={styles.LoginWrapper}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <p className={styles.label}>Email</p>
          <input
            type={"email"}
            placeholder="Enter Email"
            className={styles.input}
            onChange={(e) => setEmail(e?.target?.value)}
          />

          <p className={styles.label}>Password</p>
          <input
            type={"password"}
            placeholder="Enter Password"
            className={styles.input}
            onChange={(e) => setPassword(e?.target?.value)}
          />
          <div className="d-flex w-100 justify-content-center mt-5 pb-3">
            <Button
              className={styles.btn}
              onClick={handleLogin}
              loading={loading}
              disabled={loading}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
