const express = require("express");

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const idGenerate = () => {
  // let date = new Date();
  let id = getRandomArbitrary(1, 99999);
  return id;
};

module.exports = idGenerate;
