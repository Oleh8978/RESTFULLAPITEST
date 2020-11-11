const express = require("express");

const checkIfValuIsValidForFunction = (
  name,
  nameAftercheck,
  surname,
  surnameAftercheck,
  company,
  companyAfterCheck
) => {
  let value;
  if (
    name === nameAftercheck &&
    surname === surnameAftercheck &&
    company === companyAfterCheck
  ) {
    value = true;
    // console.log("validated");
  } else {
    // console.log("not validated");
    value = false;
  }
  return value;
};

module.exports = checkIfValuIsValidForFunction;
