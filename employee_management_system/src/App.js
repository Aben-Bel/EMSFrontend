import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./_components/PrivateRoute";
import { history } from "./_helpers/history";
import { Role } from "./_helpers/role";
import { AdminPage } from "./_pages/AdminPage";
import { LoginPage } from "./_pages/LoginPage";
import { HRPage } from "./_pages/HRPage";
import { authenticationService } from "./_services/authentication.service";

import { configureFakeBackend } from "./_helpers/fake-backend";
configureFakeBackend();

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
        {currentUser && currentUser.role === "User" && (
          <div>
            <HRPage />
          </div>
        )}

        {currentUser && currentUser.role === "Admin" && (
          <div>
            <AdminPage />
          </div>
        )}

        <PrivateRoute
          path="/admin"
          roles={[Role.Admin]}
          component={AdminPage}
        />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/hr" roles={[Role.Admin]} component={HRPage} />
      </div>
    </Router>
  );
}

export default App;
