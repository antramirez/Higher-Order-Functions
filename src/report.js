// report.js

const fs = require('fs');
const bitefunc = require('./bitefunc.js');

// read csv file
fs.readFile('/Users/aramirez/Desktop/NYU/Year 4/Fall/AIT/hw/DOHMH_Dog_Bite_Data.csv', 'utf8', function(err, data) {
  if (err) {
    // print error message and exit if error
    console.log("File could not be read\n", err);
    return;
  } else {
    // if file is succesfully read, make array of all lines
    const allBites = data.split("\n");
    // console.log(allBites);

    // create new array that is to be filled with bite objects
    const bitesObjs = new Array(allBites.length);

    // loop through original data and fill new array of objects
    for (let i = 0; i < allBites.length; i++) {
      // trim white space
      allBites[i].trim();
      // split allBites element by comma
      allBites[i] = allBites[i].split(",");

      // fill biteObjs array with objects containing data from allBites
      bitesObjs[i] = {
        // integer - id
        "UniqueID": allBites[i][0],
        // string - when
        "DateOfBite": allBites[i][1],
        // string - species
        "Species": allBites[i][2],
        // string - breed
        "Breed": allBites[i][3],
        // integer - age in years
        "Age": allBites[i][4],
        // string - m/f/u
        "Gender": allBites[i][5],
        // boolean - t/f
        "spayNeuter": allBites[i][6],
        // string - 1 of 5
        "borough": allBites[i][7],
        // integer - zip code
        "zipCode": allBites[i][8],
      }
      // console.log(bitesObjs[i]);
    }
    // process data
    bitefunc.processBiteData(bitesObjs);
  }
});
