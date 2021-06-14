import { authenticationService } from "./authentication.service";
import axios from "axios";
import React from "react";
import { Role } from "../_helpers/role";

export const dataService = {
  getEmployees,
  getDepartments,
};

let token =
  (JSON.parse(localStorage.getItem("currentUser")) &&
    JSON.parse(localStorage.getItem("currentUser")).token) ||
  " ";

let config = {
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
function getBonusCuts() {
  // console.log(`SALARYYY\n\n\n${getSalary(34)}`)
  return axios({ url: "/bonus_cuts", method: "GET", ...config }).then(
    (response) => {
      console.log(response.data);
    }
  );
}
function getSalary(employee_id){
  return axios({ url: "/salary", method: "GET", ...config }).then(
    (response) => {
      console.log(response.data);
    }
  );
}
function getDepartments() {
  console.log(`SALARYYY\n\n\n${getBonusCuts()}`)
  return axios({ url: "/departments", method: "GET", ...config }).then(
    (response) => {
      return response.data;
    }
  );
}

console.log("I AM IN DATA.SERVICE.JS");
