import { BehaviorSubject } from "rxjs";
import axios from "axios";

import { handleResponse } from "../_helpers/handle-response";

const tokenSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("token"))
);

// const instance = axios.create({
//   baseURL: "http://127.0.0.1:5000/",
//   timeout: 1000,
//   headers: {
//     Authorization: `Bearer ${tokenSubject.value}`,
//     Content-Type: application/json },
// });

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  // Send a POST request
  axios({
    method: "post",
    auth: {
      username,
      password,
    },
    baseURL: "http://127.0.0.1:5000/",
    url: "/login",
  }).then((response) => {
    console.log("response login: ", response);
    response = response.data;
    const user = {
      username: response.username,
      password: response.password,
      role: response.role,
      token: response.token,
    };

    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUserSubject.next(user);
    console.log("user: ", user);
    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}
