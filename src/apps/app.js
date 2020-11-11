const express = require("express");
const dns = require("dns");
const checker = express.Router();
checker.use(express.json());

const domain = require("./domainZones/domains");

checker.use(
  express.urlencoded({
    extended: true
  })
);

let checkInputAndLookUp = (name, surname, company, domains) => {
  let wordsF = [];
  let wordsL = [];
  let one = (name, nameLength, arr) => {
    for (let i = 0; i < nameLength; i++) {
      arr.push(name[i]);
    }
    for (let j = 0; j < nameLength; j++) {
      if (j < nameLength - 1) {
        arr.push(name[j] + name[j + 1]);
      }
    }
    for (let l = 0; l < nameLength; l++) {
      if (l < nameLength - 2) {
        arr.push(name[l] + name[l + 1] + name[l + 2]);
      }
    }

    return arr;
  };
  // function for the last name

  let two = (surname, surnameLength, arr) => {
    for (let q = 0; q < surnameLength; q++) {
      arr.push(surname[q]);
    }
    return arr;
  };
  let firstSection = one(name, name.length, wordsF);
  let secondSection = two(surname, surname.length, wordsL);
  // function to check the bist one from 2 arrays
  const checkTheBigestOne = (first, second) => {
    let Bigest = [];
    if (first.length !== 0 && second.length !== 0) {
      if (first.length > second.length) {
        return (Bigest = first);
      } else if (second.length > first.length) {
        return (Bigest = second);
      } else if (first.length === 0) {
        return (Bigest = second);
      } else if (second.length === 0) {
        Bigest = first;
      } else if ((first.length === second.length) === 0) {
        return (Bigest = []);
      }
    }
    return Bigest;
  };
  let value = checkTheBigestOne(firstSection, secondSection);

  let finalArrBeforeDNSCheck = () => {
    let arr;
    return arr;
  };

  return value;
};

checker.post("/", (req, res, next) => {
  let name = req.body.name;
  let surname = req.body.surname;
  let company = req.body.company;
  console.log(checkInputAndLookUp(name, surname, company, domain));
  res.status(201).json({
    name: name + "",
    surname: surname + "",
    company: company + ""
  });
});

module.exports = checker;
