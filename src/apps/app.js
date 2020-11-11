const express = require("express");
const dns = require("dns");
const checker = express.Router();
checker.use(express.json());

const domain = require("./domainZones/domains");
const checkInputAndLookUp = require("./function/functions");
const idGenerate = require("./idGenerator/idgenrqator");
const validateEntry = require("./validators/validators");
const checkIfValuIsValidForFunction = require("./validators/checkers");

checker.use(
  express.urlencoded({
    extended: true
  })
);

checker.post("/", (req, res, next) => {
  let name = validateEntry(req.body.name);
  let surname = validateEntry(req.body.surname);
  let company = validateEntry(req.body.company);
  let arrOfAvailableEmails = [];
  let arrOfObjectsForJson = [];
  if (
    checkIfValuIsValidForFunction(
      req.body.name,
      name,
      req.body.surname,
      surname,
      req.body.company,
      company
    )
  ) {
    arrOfAvailableEmails = checkInputAndLookUp(name, surname, company, domain);
    for (let i = 0; i < arrOfAvailableEmails.length; i++) {
      arrOfObjectsForJson.push({
        id: idGenerate(),
        mail: arrOfAvailableEmails[i]
      });
    }
  }
  // console.log(arrOfObjectsForJson);
  // console.log(checkInputAndLookUp(name, surname, company, domain));
  // console.log(idGenerate());

  if (arrOfObjectsForJson.length !== 0) {
    res.status(201).json({
      number: arrOfObjectsForJson.length,
      mails: arrOfObjectsForJson.map((mail) => {
        //  console.log(mail.mail);
        return {
          id: mail.id,
          mail: mail.mail
        };
      })
    });
  } else {
    res.status(201).json({
      name: name,
      surname: surname,
      company: company,
      err:
        "Warning! Validate entry! Note: do not leave empty spaces and do not put invalid charcters, all fields should be filled up"
    });
  }
});

module.exports = checker;
