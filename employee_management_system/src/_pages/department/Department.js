import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(3),
  },
  topBottomMargin: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    backgroundColor: "red",
  },
}));

export default function Department(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  console.log(location.state.key);
  const department = location.state.key;

  const handleOnClick = useCallback(() => history.push("/users"), [history]);

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              department Detail
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  value={department.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  value={department.sname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="dob"
                  name="dob"
                  label="Date of birth"
                  fullWidth
                  value={department.dob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="department"
                  name="department"
                  label="Department"
                  fullWidth
                  autoComplete="department"
                  value={department.department}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="HourlyRate"
                  name="HourlyRate"
                  label="Hourly Rate"
                  fullWidth
                  autoComplete="HourlyRate"
                  value={department.hourlyRate}
                />
              </Grid>
            </Grid>
          </React.Fragment>

          <React.Fragment>
            <div className={classes.buttons}>
              <Button
                color="secondary"
                onClick={handleOnClick}
                className={classes.button}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnClick}
                className={classes.button}
              >
                {department.action}
              </Button>
            </div>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
