import * as React from "react";
import { Layout } from "../_components/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import GroupIcon from "@material-ui/icons/Group";
import PaymentIcon from "@material-ui/icons/Payment";
import BusinessIcon from "@material-ui/icons/Business";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Employees from "./employees/Employees";
import Employee from "./employees/Employee";
import Department from "./department/Department";
import Departments from "./department/Departments";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

function HRPage() {
  const classes = useStyles();
  return (
    <Router>
      <Layout
        dashboard="Admin"
        content={
          <Switch>
            <Route exact path="/employees">
              <Employees />
            </Route>
            <Route exact path="/employee">
              <Employee />
            </Route>
            <Route exact path="/departments">
              <Departments />
            </Route>
            <Route exact path="/department">
              <Department />
            </Route>
            <Route exact path="/attendance"></Route>
            <Route exact path="/payment"></Route>
            <Route exact path="/account"></Route>
          </Switch>
        }
        mainListItems={
          <div>
            <Link to="/employees" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Employees" />
              </ListItem>
            </Link>
            <Link to="/departments" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Department" />
              </ListItem>
            </Link>
            <Link to="/attendance" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <LibraryAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItem>
            </Link>
            <Link to="/payment" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary="Salary" />
              </ListItem>
            </Link>
            <Link to="/account" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>
            </Link>
          </div>
        }
      />
    </Router>
  );
}

export { HRPage };
