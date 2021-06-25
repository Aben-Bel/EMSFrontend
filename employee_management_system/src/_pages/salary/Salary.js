import React, { useEffect, useState } from "react";
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
  date: Yup.date().required("Required").typeError("It must be a date"),
});
export default function Salary(props) {
  const classes = useStyles();
  const history = useHistory();
  const [salary, setSalary] = useState(0);
  const [employees, setEmployees] = useState([]);

  const INITIAL_FROM_STATE = {
    employeeId: "",
    date: moment.utc(new Date()).format("L"),
  };

  useEffect(() => {
    dataService.getEmployees().then((data) => {
      setEmployees(data);
    });
  }, []);

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Record Employee Salary
            </Typography>
            <Formik
              initialValues={{ ...INITIAL_FROM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { setStatus }) => {
                values.employeeId = values.employeeId.split("-")[0];
                console.log("to calculate: ", values);
                setStatus({
                  sent: false,
                  msg: "Sending...",
                });
                dataService
                  .getSalary(values.employeeId)
                  .then((res) => {
                    console.log("response status: ", res);
                    if (res.status === 201) {
                      setStatus({
                        sent: true,
                        msg: "Salary Calculated.",
                        body: `Gross: ${res.data.amount}\nBonus: ${res.data.bonus_cuts}\nNET: ${res.data.net}\nTaxed: ${res.data.tax} `,
                      });
                    }
                  })
                  .catch((err) => {
                    setStatus({
                      sent: false,
                      msg: `${err}. Please try again later.`,
                    });
                  });
              }}
            >
              {({ setFieldValue, status }) => (
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
                          Make Payment
                        </ButtonWrapper>
                      </div>
                    </Grid>
                  </Grid>
                  {status && status.msg && (
                    <div>
                      <p
                        className={`alert ${
                          status.sent ? "alert-success" : "alert-error"
                        }`}
                      >
                        {status.msg}
                      </p>
                      <p
                        className={`alert ${
                          status.sent ? "alert-success" : "alert-error"
                        }`}
                      >
                        {status.body}
                      </p>
                    </div>
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
