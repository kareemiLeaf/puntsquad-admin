import { Route } from "react-router-dom";

function PublicRoute({ component: Component, path, ...rest }) {
  return (
    <Route path={path} {...rest}>
      <Component />
    </Route>
  );
}

export default PublicRoute;
