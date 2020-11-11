const dns = require("dns");
const express = require("express");

const mxExists = (email) => {
  const hostname = email.split("@")[1];
  if (
    dns.resolveMx(hostname, (err, addresses) => {
      if (addresses !== undefined) {
        //console.log(Object.values(addresses[0])[0]);
        return Object.values(addresses[0])[0];
      }
    })
  ) {
    ///  console.log("okay");
    return true;
  } else {
    //   console.log("failed");
    return false;
  }
};

module.exports = mxExists;
