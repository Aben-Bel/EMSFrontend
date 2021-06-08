import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";

import TextFieldWrapper from "../../_components/FormsUI/TextFieldWrapper";
import ButtonWrapper from "../../_components/FormsUI/ButtonWrapper";

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

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required("Required")
    .test("Name", "Name shouldn't contain a number", (val) => {
      return !/\d/.test(val);
    }),
  lastName: Yup.string()
    .required("Required")
    .test("Name", "Name shouldn't contain a number", (val) => {
      return !/\d/.test(val);
    }),
  department: Yup.string().required("Required"),
  hourlyRate: Yup.number()
    .typeError("Must be a positive number")
    .required("Required")
    .positive("Hourly Rate must be positive"),
  dob: Yup.date("Not a date")
    .required("Required")
    .test("Date of Birth", "You have to be above 18 at least", (value) => {
      return moment().diff(moment(value), "years") >= 18;
    }),
});

export default function Employee(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  console.log(location.state.key);
  const employee = location.state.key;

  const handleOnClick = useCallback(() => history.push("/users"), [history]);

  const INITIAL_FROM_STATE = {
    firstName: employee.first_name,
    lastName: employee.last_name,
    dob: employee.date_of_birth,
    department: employee.department_title,
    hourlyRate: employee.hourly_rate,
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Employee Detail
            </Typography>
            <Formik
              initialValues={{ ...INITIAL_FROM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextFieldWrapper
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldWrapper
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldWrapper
                      required
                      id="dob"
                      name="dob"
                      label="Date of birth"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextFieldWrapper
                      required
                      id="department"
                      name="department"
                      label="Department"
                      fullWidth
                      autoComplete="department"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextFieldWrapper
                      required
                      id="hourlyRate"
                      name="hourlyRate"
                      label="Hourly Rate"
                      fullWidth
                      autoComplete="HourlyRate"
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <React.Fragment>
                      <div className={classes.buttons}>
                        <Button
                          color="secondary"
                          onClick={() => history.push("/")}
                          className={classes.button}
                        >
                          Delete
                        </Button>
                        <ButtonWrapper
                          variant="contained"
                          color="primary"
                          // onClick={handleOnClick}
                          className={classes.button}
                        >
                          {employee.action}
                        </ButtonWrapper>
                      </div>
                    </React.Fragment>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
