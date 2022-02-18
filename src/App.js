import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";

import PrivateRoute from "common/PrivateRoute";
import PublicRoute from "common/PublicRoute";
import ScrollToTop from "common/ScrollToTop";
// import Dashboard from "pages/Dashboard";
import IdenetityVerification from "pages/IdenetityVerification";
import Login from "pages/Login";
import News from "pages/News";
import NotFound from "pages/NotFound";
import Report from "pages/Report";
import TipOfTheDay from "pages/TipOfTheDay";
import TrendingEvents from "pages/TrendingEvents";
import UserDetails from "pages/UserDetails";
import Users from "pages/Users";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <PublicRoute path="/" exact component={Login} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/user-details" component={UserDetails} />
        <PrivateRoute path="/trending-news" exact component={TrendingEvents} />
        <PrivateRoute path="/news" exact component={News} />
        <PrivateRoute path="/tip-of-the-day" exact component={TipOfTheDay} />
        <PrivateRoute
          path="/identity-verification"
          exact
          component={IdenetityVerification}
        />
        <PrivateRoute path="/reports" exact component={Report} />
        <Route path="*" exact>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
