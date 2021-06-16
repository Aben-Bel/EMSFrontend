import * as React from "react";
import { Layout } from "../_components/Layout";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupIcon from "@material-ui/icons/Group";
import Users from "./users/Users";
import User from "./users/User";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

function AdminPage() {
  const classes = useStyles();
  console.log("lets render hr");
  return (
    <Router>
      <Layout
        dashboard="Admin"
        content={
          <Switch>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/user">
              <User />
            </Route>
          </Switch>
        }
        mainListItems={
          <div>
            <Link to="/users" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItem>
            </Link>
          </div>
        }
      />
    </Router>
  );
}

export { AdminPage };
