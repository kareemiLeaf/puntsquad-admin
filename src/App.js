// import "antd/dist/antd.css";
import "antd/dist/antd.min.css";
import "bootstrap/dist/css/bootstrap.css";

import PrivateRoute from "common/PrivateRoute";
import PublicRoute from "common/PublicRoute";
import ScrollToTop from "common/ScrollToTop";
import AddNewPuntUser from "pages/AddNewPuntUser";
import Advertising from "pages/Advertisement";
// import Dashboard from "pages/Dashboard";
import IdenetityVerification from "pages/IdenetityVerification";
import Login from "pages/Login";
import News from "pages/News";
import NotFound from "pages/NotFound";
import PostPuntsTip from "pages/PostPuntsTip";
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
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/user-details" component={UserDetails} />
        <PrivateRoute path="/trending-news" exact component={TrendingEvents} />
        <PrivateRoute path="/news" exact component={News} />
        <PrivateRoute path="/advertisement" exact component={Advertising} />
        <PrivateRoute path="/tip-of-the-day" exact component={TipOfTheDay} />
        <PrivateRoute
          path="/post-punts-tips/:id"
          exact
          component={PostPuntsTip}
        />
        <PrivateRoute
          path="/identity-verification"
          exact
          component={IdenetityVerification}
        />
        <PrivateRoute path="/reports" exact component={Report} />
        <PrivateRoute path="/new-punts-user" exact component={AddNewPuntUser} />

        <Route path="*" exact>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
