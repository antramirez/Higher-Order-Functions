// report.js

// const fs = require('fs');
const bitefunc = require('./bitefunc.js');
const request = require('request');

// array to contain arrays of each web page's data
const allData = [];

// recursive function to continue to look for more data after initital request is made
function processMoreData(next) {
  request('http://jvers.com/csci-ua.0480-fall2018-001-003/homework/02/dogbite/' + next + '.json', function (error, response, body) {
    if (error) {
      console.log("File could not be read");
      return;
    }
    else {
      // parse data using JSON's parse method
      const parsedData = JSON.parse(body);

      // put parsed data 'data' into array that continues to grow with every recursive function call
      // parsedData's 'data' property contains dog bite objects
      allData.push(parsedData.data);

      // parsedData's 'next' property contains the path to the following data to parse
      // if it's not undefined, recursively call function processMoreData
      if (parsedData.next !== undefined) {
        processMoreData(parsedData.next);
      }
      else {
        // array to contain combined data from every web page
        const dataToOutput = [];
        for (let i = 0; i < allData.length; i++) {
          // concatenate arrays into one big array to be processed
          dataToOutput.push.apply(dataToOutput, allData[i]);
        }
        // when 'next' no longer has another path, output results
        console.log(bitefunc.processBiteData(dataToOutput));
        return;
      }
    }
  });
}

// initial request
request('http://jvers.com/csci-ua.0480-fall2018-001-003/homework/02/dogbite/c86d267e9c6c89416bf9e96ba7fa62a4ba1ec93f.json',function (error, response, body) {
  if (error) {
    console.log("File could not be read");
    return;
  }
  else {
    // parse data using JSON's parse method
    const parsedData = JSON.parse(body);

    // put parsed data 'data' into array that continues to grow with every recursive function call
    // parsedData's 'data' property contains dog bite objects
    allData.push(parsedData.data);

    // recursive call
    processMoreData(parsedData.next);
  }
});



// // read csv file
// fs.readFile('/Users/aramirez/Desktop/NYU/Year 4/Fall/AIT/hw/DOHMH_Dog_Bite_Data.csv', 'utf8', function(err, data) {
//   if (err) {
//     // print error message and exit if error
//     console.log("File could not be read\n", err);
//     return;
//   } else {
//     // if file is succesfully read, make array of all lines
//     const allBites = data.split("\n");
//
//     // create new array that is to be filled with bite objects
//     const bitesObjs = new Array(allBites.length);
//
//     // loop through original data and fill new array of objects
//     for (let i = 0; i < allBites.length; i++) {
//       // trim white space
//       allBites[i].trim();
//       // split allBites element by comma
//       /* regex taken from https://stackoverflow.com/questions/23582276/split-string-by-comma-but-ignore-commas-inside-quotes/23582323*/
//       allBites[i] = allBites[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
//
//       // fill biteObjs array with objects containing data from allBites
//       bitesObjs[i] = {
//         // integer - id
//         "UniqueID": allBites[i][0],
//         // string - when
//         "DateOfBite": allBites[i][1],
//         // string - species
//         "Species": allBites[i][2],
//         // string - breed
//         "Breed": allBites[i][3],
//         // integer - age in years
//         "Age": allBites[i][4],
//         // string - m/f/u
//         "Gender": allBites[i][5],
//         // boolean - t/f
//         "SpayNeuter": allBites[i][6],
//         // string - 1 of 5
//         "Borough": allBites[i][7],
//         // integer - zip code
//         "ZipCode": allBites[i][8]
//       };
//     }
//     // process data
//     console.log(bitefunc.processBiteData(bitesObjs));
//   }
// });
