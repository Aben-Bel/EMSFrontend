import axios from "axios";

export function loginUser(dispatch, loginPayload) {
  let user = {};
  try {
    dispatch({ type: "REQUEST_LOGIN" });

    return axios({
      method: "post",
      auth: {
        username: loginPayload.username,
        password: loginPayload.password,
      },
      baseURL: "http://127.0.0.1:5000/",
      url: "/login",
    })
      .then((response) => response.data)
      .then((data) => {
        user = {
          username: data.username,
          token: data.token,
        };
        console.log("got data yayyy");
        console.log("user: ", user);

        if (user) {
          console.log("let's save you to local storage use");
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          localStorage.setItem("currentUser", JSON.stringify(user));
          return user;
        }

        dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
        return;
      });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
