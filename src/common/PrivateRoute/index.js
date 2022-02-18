import LayoutWrapper from "common/LayoutWrapper";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

import { isLogin } from "../../utils";

function PrivateRoute({ component: Component, path, ...rest }) {
  return (
    <Route path={path} {...rest}>
      <LayoutWrapper>
        {isLogin() ? <Component /> : <Redirect to="/" />}
      </LayoutWrapper>
    </Route>
  );
}

export default PrivateRoute;
