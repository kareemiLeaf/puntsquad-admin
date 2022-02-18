import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

function NotFound() {
  return (
    <div className={styles.NotFoundWrapper}>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
