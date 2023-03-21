import { Switch } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/Signup";
import { Route } from "./Route";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
