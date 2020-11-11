const express = require("express");
const mxExists = require("./dnsMxRecordCheck");

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

  let finalArrBeforeDNSCheck = (
    arrOne,
    arrTwo,
    comp,
    domainArr,
    nameF,
    nameL
  ) => {
    let arr = [];
    let value = checkTheBigestOne(firstSection, secondSection);
    if (arrOne.length !== 0) {
      for (let q = 0; q < value.length; q++) {
        if (arrOne[q] !== undefined && domainArr[q] !== undefined) {
          let valueForMail = arrTwo.join("");
          arr.push(arrOne[q] + "." + valueForMail + "@" + comp + domainArr[q]);
          if (arrOne[q] === undefined) {
            arr.push(valueForMail + "@" + comp + domainArr[q]);
          }
        }
      }
      for (let j = 0; j < value.length; j++) {
        if (arrTwo[j] !== undefined && domainArr[j] !== undefined) {
          arr.push(nameF + "." + arrTwo[j] + "@" + comp + domainArr[j]);
        }
      }
    }
    for (let j = 0; j < domainArr.length; j++) {
      arr.push(nameF + nameL + "@" + comp + domainArr[j]);
      arr.push(nameL + "." + nameF + "@" + comp + domainArr[j]);
    }
    for (let mk = 0; mk < domainArr.length; mk++) {
      for (let u = 0; u < value.length; u++) {
        arr.push(nameF + "." + arrTwo[u] + "@" + comp + domainArr[mk]);
      }
    }
    let newArrToLoverCase = [];
    for (let kl = 0; kl < arr.length; kl++) {
      newArrToLoverCase.push(arr[kl].toLowerCase());
    }
    let arrAfterDNSLookUp = [];
    for (let e = 0; e < newArrToLoverCase.length; e++) {
      //  console.log(mxExists(newArrToLoverCase[e]));
      if (mxExists(newArrToLoverCase[e])) {
        //  console.log(newArrToLoverCase[e]);
        arrAfterDNSLookUp.push(newArrToLoverCase[e]);
      }
      // console.log(newArrToLoverCase[e]);
    }

    return arrAfterDNSLookUp;
  };

  return finalArrBeforeDNSCheck(
    firstSection,
    secondSection,
    company,
    domains,
    name,
    surname
  );
};

module.exports = checkInputAndLookUp;
