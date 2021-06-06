import React, { useCallback } from "react";
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

  const INITIAL_FROM_STATE = {
    employeeId: "",
    hoursWorked: 0,
  };

  const employees = [
    {
      id: "12342",
      first_name: "Abebe",
      last_name: "kebede",
      email: "abebe.kebede",
      date_of_birth: "12/12/2000",
      hourly_rate: "50",
      department_id: "1324",
    },
    {
      id: "1232342",
      first_name: "Kebedech",
      last_name: "Abebech",
      email: "kebedech.abebech",
      date_of_birth: "12/12/2000",
      hourly_rate: "60",
      department_id: "12341",
    },
    {
      id: "1212342",
      first_name: "Beso",
      last_name: "Bela",
      email: "Beso.bela",
      date_of_birth: "12/12/2000",
      hourly_rate: "20",
      department_id: "13423",
    },
  ];

  const handleOnClick = useCallback(() => history.push("/users"), [history]);

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
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={employees}
                      getOptionLabel={(option) =>
                        option.id +
                        "-" +
                        option.first_name +
                        " " +
                        option.last_name
                      }
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
              </Form>
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
