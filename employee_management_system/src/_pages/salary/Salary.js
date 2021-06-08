import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Autocomplete, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "../../_components/FormsUI/ButtonWrapper";
import TextFieldWrapper from "../../_components/FormsUI/TextFieldWrapper";
import moment from "moment";

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
  date: Yup.date().required("Required").typeError("It must be a date"),
});
export default function Salary(props) {
  const classes = useStyles();
  const history = useHistory();

  const INITIAL_FROM_STATE = {
    employeeId: "",
    date: moment.utc(new Date()).format("L"),
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
              {({ setFieldValue }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        id="employeeId"
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
                            id="employeeTextId"
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
                        id="date"
                        name="date"
                        label="Date Salary Given"
                        fullWidth
                        placeholder="DD-MM-YYYY"
                        autoComplete="date-Worked"
                      />
                    </Grid>
                    <Grid item xs={4} sm={3}>
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
                          onClick={() => {
                            console.log("was clicked cal");
                          }}
                          className={classes.button}
                        >
                          Calculate Salary
                        </ButtonWrapper>
                      </div>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
