import { Switch } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SignUp } from "../pages/Signup";
import { Route } from "./Route";

export const Routes = () => {
  const { accessToken } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route component={NotFoundPage} isPrivate={!!accessToken} />
    </Switch>
  );
};
