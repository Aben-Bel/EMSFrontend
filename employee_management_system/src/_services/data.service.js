import { authenticationService } from "./authentication.service";
import axios from "axios";
import React from "react";
import { Role } from "../_helpers/role";

export const dataService = {
  getEmployees,
  getDepartments,
};

const token =
  (JSON.parse(localStorage.getItem("currentUser")) &&
    JSON.parse(localStorage.getItem("currentUser")).token) ||
  " ";

const config = {
  headers: {
    "x-access-token": token,
  },
  baseURL: "http://127.0.0.1:5000/",
};

function getEmployees(username, password) {
  return axios({ url: "/employees", method: "GET", ...config }).then(
    (response) => {
      return response.data;
    }
  );
}

function getDepartments() {
  return axios({ url: "/departments", method: "GET", ...config }).then(
    (response) => {
      return response.data;
    }
  );
}
