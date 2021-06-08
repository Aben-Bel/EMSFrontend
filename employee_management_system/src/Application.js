import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "./_components/PrivateRoute";
import { history } from "./_helpers/history";
import { Role } from "./_helpers/role";
import { AdminPage } from "./_pages/AdminPage";
import { LoginPage } from "./_pages/LoginPage";
import { HRPage } from "./_pages/HRPage";
import { useAuthDispatch, useAuthState } from "./_context/context";
import { logout } from "./_context/action";

function Application() {
  const userDetails = useAuthState();
  const dispath = useAuthDispatch();

  function logoutHandler() {
    logout(dispath);
  }

  return (
    <Router history={history}>
      <div>
        {!userDetails.user && (
          <Redirect
            to={{ pathname: "/login", state: { from: history.location } }}
          />
        )}

        {userDetails.user && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link
                to="/login"
                onClick={logoutHandler}
                className="nav-item nav-link rightalign"
              >
                Logout
              </Link>
            </div>
          </nav>
        )}

        <Route
          exact
          path={"/"}
          component={function HomePage() {
            const user = userDetails.user;
            console.log("User::: ", user, "userDetails: ", userDetails);
            if (!user) {
              return (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: history.location },
                  }}
                />
              );
            }
            if (user.role === Role.User) {
              return (
                <Redirect
                  to={{ pathname: "/hr", state: { from: history.location } }}
                />
              );
            }

            if (user.role === Role.Admin) {
              return (
                <Redirect
                  to={{
                    pathname: "/admin",
                    state: { from: history.location },
                  }}
                />
              );
            }
            return <div></div>;
          }}
        />
        <PrivateRoute
          path="/admin"
          roles={[Role.Admin]}
          component={AdminPage}
        />

        <PrivateRoute path="/hr" roles={[Role.User]} component={HRPage} />
        <Route path={["/login"]} component={LoginPage} />
      </div>
    </Router>
  );
}

export default Application;
