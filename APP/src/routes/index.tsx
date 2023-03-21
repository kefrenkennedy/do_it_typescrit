import { Switch } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { Route } from "./route";

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);
