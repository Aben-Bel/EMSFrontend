import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Button, Autocomplete, Modal } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import moment from "moment";

import TextFieldWrapper from "../../_components/FormsUI/TextFieldWrapper";
import ButtonWrapper from "../../_components/FormsUI/ButtonWrapper";
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
  username: Yup.string()
    .required("Required")
    .test("Username", "Username shouldn't contain a number", (val) => {
      return !/\d/.test(val);
    }),
  password: Yup.string().required("Required"),
});

export default function User(props) {
  console.log("here user");
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const user = location.state.key;

  const INITIAL_FROM_STATE = {
    username: user.username,
    role: user.user_role,
    password: "",
  };

  const handleDelete = () => {
    if (user.action === "Save") {
      dataService
        .deleteUser(user.id)
        .then((res) => {
          console.log("Deleted: ", res);
          history.push("/users");
        })
        .catch((error) => {});
    }
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              user Detail
            </Typography>
            <Formik
              initialValues={{ ...INITIAL_FROM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { setStatus }) => {
                console.log("values user: ", values);
                if (user.action === "Create") {
                  values.departmentId = values.departmentId.split("-")[0];
                  dataService
                    .addUser(values)
                    .then((res) => {
                      console.log("response status: ", res);
                      if (res.status === 201) {
                        setStatus({
                          sent: true,
                          msg: "Sucessfully Added user",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log("was here to report an error user");
                      setStatus({
                        sent: false,
                        msg: `${err}. Please try again later.`,
                      });
                    });
                } else if (user.action === "Save") {
                  values.departmentId = values.departmentId.split("-")[0];
                  values.id = user.id;
                  dataService
                    .editUser(values)
                    .then((res) => {
                      console.log("response status: ", res);
                      if (res.status === 201) {
                        setStatus({
                          sent: true,
                          msg: "Sucessfully Added user",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log("was here to report an error user");
                      setStatus({
                        sent: false,
                        msg: `${err}. Please try again later.`,
                      });
                    });
                }
              }}
            >
              {({ setFieldValue, status }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextFieldWrapper
                        required
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        autoComplete="given-name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextFieldWrapper
                        required
                        id="role"
                        name="role"
                        label="Role"
                        fullWidth
                        autoComplete="family-name"
                      />
                    </Grid>{" "}
                    <Grid item xs={12}>
                      <TextFieldWrapper
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        autoComplete="password"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <React.Fragment>
                        {user.action === "Save" ? (
                          <Button
                            color="secondary"
                            onClick={() => {
                              setOpen(true);
                            }}
                            className={classes.button}
                          >
                            Delete
                          </Button>
                        ) : (
                          <span></span>
                        )}
                        <div className={classes.buttons}>
                          <Button
                            color="secondary"
                            onClick={() => {
                              history.push("/users");
                            }}
                            className={classes.button}
                          >
                            <span>Cancel</span>
                          </Button>
                          <ButtonWrapper
                            variant="contained"
                            color="primary"
                            type="submit"
                            // onClick={console.log("was clicked user")}
                            className={classes.button}
                          >
                            {user.action}
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
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              position: "absolute",
              top: `40%`,
              left: `40%`,
              background: "#c1d3f0",
              width: "400",
              border: "1px solid #000",
              boxShadow: "3",
              padding: "2, 4, 3",
            }}
            className={classes.paper}
          >
            <h2 id="simple-modal-title">Warning!</h2>
            <p id="simple-modal-description">
              Are you sure? You are about to remove an user.
            </p>
            <Button
              color="secondary"
              onClick={() => {
                setOpen(false);
                history.push("/users");
                handleDelete();
              }}
              className={classes.button}
            >
              Delete
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setOpen(false);
              }}
              className={classes.button}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </main>
    </React.Fragment>
  );
}
