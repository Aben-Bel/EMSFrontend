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
import PlusOneIcon from "@material-ui/icons/PlusOne";
import Employees from "./employees/Employees";
import Employee from "./employees/Employee";
import Department from "./department/Department";
import Departments from "./department/Departments";
import Attendance from "./attendance/Attendances";
import BonusCuts from "./bonus_cuts/BonusCuts";
import Salary from "./salary/Salary";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

function HRPage() {
  const classes = useStyles();
  console.log("lets render hr");
  return (
    <Router>
      <Layout
        dashboard="HR"
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
            <Route exact path="/attendance">
              <Attendance />
            </Route>
            <Route exact path="/bonus_cuts">
              <BonusCuts />
            </Route>
            <Route exact path="/payment">
              <Salary />
            </Route>
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
                <ListItemText primary="Hours Worked" />
              </ListItem>
            </Link>

            <Link to="/bonus_cuts" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <PlusOneIcon />
                </ListItemIcon>
                <ListItemText primary="Bonus Cuts" />
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
          </div>
        }
      />
    </Router>
  );
}

export { HRPage };
