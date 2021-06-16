import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Autocomplete, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "../../_components/FormsUI/ButtonWrapper";
import TextFieldWrapper from "../../_components/FormsUI/TextFieldWrapper";
import { dataService } from "../../_services/data.service";

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
  employeeId: Yup.string().required("Required"),
  hoursWorked: Yup.number()
    .typeError("Must be a positive number")
    .required("Required")
    .positive("Hourly Rate must be positive"),
});

export default function Attendance(props) {
  const classes = useStyles();
  const history = useHistory();
  const [employees, setEmployees] = useState([]);

  const INITIAL_FROM_STATE = {
    employeeId: "",
    hoursWorked: 0,
  };
  useEffect(() => {
    dataService.getEmployees().then((data) => {
      setEmployees(data);
    });
  }, []);

  function handleOnSubmit(value, setStatus) {
    console.log("Attendance: ", value);
    value.employeeId = value.employeeId.split("-")[0];
    dataService
      .addAttendance(value)
      .then((res) => {
        console.log("response status: ", res);
        if (res.status === 201) {
          setStatus({
            sent: true,
            msg: "Sucessfully Added Attendance",
          });
        }
      })
      .catch((err) => {
        setStatus({
          sent: false,
          msg: `${err}. Please try again later.`,
        });
      });
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Record Employee worked hours
            </Typography>
            <Formik
              initialValues={{ ...INITIAL_FROM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { setStatus }) => {
                setStatus({
                  sent: false,
                  msg: "Sending...",
                });
                handleOnSubmit(values, setStatus);
              }}
            >
              {({ setFieldValue, status }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="combo-box-demo"
                        name="employeeId"
                        options={employees}
                        getOptionLabel={(option) =>
                          option.id +
                          "-" +
                          option.first_name +
                          " " +
                          option.last_name
                        }
                        onChange={(e, value) => {
                          value =
                            value.id +
                            "-" +
                            value.first_name +
                            " " +
                            value.lastname;
                          setFieldValue(
                            "employeeId",
                            value !== null
                              ? value
                              : INITIAL_FROM_STATE.employeeId
                          );
                        }}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextFieldWrapper
                            {...params}
                            required
                            id="employeeId"
                            name="employeeId"
                            label="Employee Id"
                            fullWidth
                            autoComplete="employee-id"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextFieldWrapper
                        required
                        id="hoursWorked"
                        name="hoursWorked"
                        label="Hours Worked"
                        fullWidth
                        autoComplete="Hours-Worked"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <React.Fragment>
                        <div className={classes.buttons}>
                          <Button
                            color="secondary"
                            onClick={() => {
                              history.push("/");
                            }}
                            className={classes.button}
                          >
                            Cancel
                          </Button>
                          <ButtonWrapper
                            variant="contained"
                            color="primary"
                            // onClick={handleOnClick}
                            className={classes.button}
                          >
                            Add
                          </ButtonWrapper>
                        </div>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                  {status && status.msg && (
                    <p
                      className={`alert ${
                        status.sent ? "alert-success" : "alert-error"
                      }`}
                    >
                      {status.msg}
                    </p>
                  )}
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
