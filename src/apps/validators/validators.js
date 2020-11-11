const express = require("express");

const validateEntry = (value) => {
  let err;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === " ") {
      err = "Do not left clear input";
    } else if (value[i].trim() === ".") {
      err = "The character '.' is not acceptable ";
    } else if (value[i].trim() === "@") {
      err = "The character @ is not acceptable ";
    } else if (value[i].trim() === ",") {
      err = "The character , is not acceptable ";
    } else if (value[i].trim() === "&") {
      err = "The character & is not acceptable ";
    } else if (value[i].trim() === "!") {
      err = "The character ! is not acceptable ";
    } else if (value[i].trim() === "?") {
      err = "The character ? is not acceptable ";
    } else if (value[i].trim() === "~") {
      err = "The character ~ is not acceptable ";
    } else if (value[i].trim() === "^") {
      err = "The character ^ is not acceptable ";
    } else if (value[i].trim() === ":") {
      err = "The character : is not acceptable ";
    } else if (value[i].trim() === ";") {
      err = "The character ; is not acceptable ";
    } else if (
      value[i].trim() === "/" ||
      value[i].trim() === "|" ||
      value[i].trim() === "\\"
    ) {
      err = "The character \\ or / or  is not accepted ";
    } else {
      err = value;
    }
  }
  return err;
};

module.exports = validateEntry;
