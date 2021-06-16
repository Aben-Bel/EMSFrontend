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
import { authenticationService } from "./_services/authentication.service";

import { configureFakeBackend } from "./_helpers/fake-backend";
// configureFakeBackend();

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    authenticationService.currentUser.subscribe((x) => {
      setCurrentUser(x);
      setIsAdmin(x && x.role === Role.Admin);
    });
  });

  function logout() {
    authenticationService.logout();
  }

  return (
    <Router history={history}>
      <div>
        {!currentUser && (
          <Redirect
            to={{ pathname: "/login", state: { from: history.location } }}
          />
        )}

        {currentUser && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
              <Link
                to="/login"
                onClick={logout}
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
          user={currentUser}
          component={function HomePage() {
            const user = authenticationService.currentUserValue;

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
            if (user.role === Role.Manager) {
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

        <PrivateRoute path="/hr" roles={[Role.Manager]} component={HRPage} />
        <Route path={["/login"]} component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
