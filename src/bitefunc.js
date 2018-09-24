// bitefunc.js

function processBiteData(bites){
  // final report string
  let output = "";

  let ages = [];
  let agesSum = 0;
  let avgAge = 0;
  
  let spayNeutValid = [];
  let spayNeut = [];
  let spayNeutPecent = 0;

  // most chompy breeds
  let breedBites = [];
  let breedObjs = [];

  // most chompy boroughs
  let boroughs = [];
  let boroughObjs = [];

  // most chompy months
  let monthsArr = [];
  let yearsArr = [];
  let monthObjs = [];

  // validate data
  bites.forEach(function(bite) {
    // IDs should be integers
    if (!isNaN(bite.UniqueID)) {
      bite.UniqueID = parseInt(bite.UniqueID, 10);
    }

    // use regex to determine if age contains non-digit character and is not empty
    // and then put in valid ages array
    if (!/[\D]/.test(bite.Age) && bite.Age !== '') {
      ages.push(bite.Age);
    }

    // spay/neutered should be boolean
    if (bite.SpayNeuter === 'true') {
      spayNeutValid.push(bite.SpayNeuter === 'true');
    } else if(bite.SpayNeuter === 'false') {
      spayNeutValid.push(bite.SpayNeuter === 'true');
    }

    // zip codes should be integers
    if (!isNaN(bite.zipCode)) {
      bite.zipCode = parseInt(bite.zipCode, 10);
    }
  });

  // convert every valid age from string to integer using array map
  ages = ages.map(age =>  age = parseInt(age,10));

  // use reduce to sum up all ages
  agesSum = ages.reduce((acc, curr) => acc + curr, 0);

  // find average age
  avgAge = agesSum / ages.length;

  // use filter to find number of spay/neutered dogs
  spayNeut = spayNeutValid.filter(bool => bool === true);

  // create new objects that contain breed/number of bites, borough/number of bites,
  for (let i = 0; i < bites.length; i++) {
      // make sure breed is not undefined or empty
      if (bites[i].Breed !== '' && bites[i].Breed !== undefined && bites[i].Breed.toUpperCase() !== 'UNKNOWN') {
        // make breed string lower case and get rid of extra quotes
        const breedToLower = bites[i].Breed.toLowerCase().replace(/\"/g, "");

        // bites[i].Breed = breedToLower;

        // check if breedToLower has been seen before
        if (breedBites.includes(breedToLower)) {
          // if the array breedObjs already contains that breed object, incement counter
          breedObjs.forEach(function(breed) {
            if (breed.Breed === breedToLower) {
              breed.Count++;
            }
          });
        } else {
          // add breed to distinct breed array and breed object to array
          // if breed has not been been seen before
          breedBites.push(breedToLower);
          breedObjs.push({"Breed": breedToLower, "Count": 1});
        }
      }

      // make sure borough is not undefined or empty
      if (bites[i].Borough !== undefined && bites[i].Borough !== '') {
        const boroughToLower = bites[i].Borough.toLowerCase();
        // check if boroughToLower has been seen before
        if (boroughs.includes(boroughToLower)){
          // if the array boroughObjs already contains that breed object, incement counter
          boroughObjs.forEach(function(bor){
            if (bor.Borough === boroughToLower) {
              bor.Count++;
            }
          });
        } else {
          // add borough to distinct borough array and borough object to array
          // if borough has not been been seen before
          boroughs.push(boroughToLower);
          boroughObjs.push({"Borough": boroughToLower, "Count": 1});
        }
      }

      // make sure date is not undefined or empty
      if (bites[i].DateOfBite !== undefined && bites[i].DateOfBite !== '' && bites[i].DateOfBite) {
        // split date into array
        const dateArr = bites[i].DateOfBite.split(' ');
        // month
        const m = dateArr[0];
        // year
        const y = dateArr[2];

        // make unique year array (to be used to find how many years are used)
        if (y !== undefined && y !== '') {
          if (!yearsArr.includes(y)) {
            yearsArr.push(y)
          }
        }
        // check if month has been seen before
        if (monthsArr.includes(m)) {
          // if the array monthObjs already contains that month object, incement counter
          monthObjs.forEach(function (mObj) {
            if (mObj.Month === m) {
              mObj.Count++;
            }
          });
        } else {
          // add month to distinct month array and month object to array
          // if month has not been been seen before
          monthsArr.push(m);
          monthObjs.push({"Month": m, "Count": 1})
        }
      }
  }

  // find average bites per month/year
  for(let i = 0; i < monthObjs.length; i++) {
    monthObjs[i].Count /= monthsArr.length;
  }

  // sort breed, borough, and month counts
  breedObjs.sort(sortCount);
  boroughObjs.sort(sortCount);
  monthObjs.sort(sortCount);

  // output
  output += 'Average age of these chompy friends is: ' + avgAge.toFixed(2) + '\n';
  output += '\nThe percentage of biting dogs that are spayed/neutered: ' + (spayNeut.length / spayNeutValid.length * 100).toFixed(2) + '%\n\n';

  output += 'Top Ten Most Chompy Breeds:\n';
  for (let i = 0; i < 10; i++) {
    output += (i+1) + '. ' + firstLetterUpper(breedObjs[breedObjs.length - 1 - i].Breed) + ' with ' + breedObjs[breedObjs.length - 1 - i].Count + ' reported bites\n';
  }

  output += '\nDog Bite Leaderboard\n';
  for (let i = 0; i < 5; i++) {
    output += (i+1) + '. ' + firstLetterUpper(boroughObjs[boroughObjs.length - 1 - i].Borough) + ' with ' + boroughObjs[boroughObjs.length - 1 - i].Count + ' bites\n';
  }

  output += '\nThe top three months for dog biting are ';
  for (let i = 0; i < 3; i++) {
    if (i == 2) {
      output += 'and ' + monthObjs[monthObjs.length - 1 - i].Month + '.';
    } else {
      output += monthObjs[monthObjs.length - 1 - i].Month + ', ';
    }
  }
  return output;
}

// custom sort function to compare counts
function sortCount(obj1, obj2) {
  if (obj1.Count < obj2.Count) {return -1;}
  if (obj1.Count > obj2.Count) {return 1;}
  return 0;
}

// function to capitalize first letter in string
function firstLetterUpper(str) {
  // split string into array
  let strArr = str.split(' ');
  for (let i = 0; i < strArr.length; i++) {
    // make sure array doesn't contain '/' if breed a sub breed like Mix
    if (strArr !== '/') {
      // capitalize first letter and add rest of string
      strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
    }
  }
  // join array with spaces to make it a string again
  return strArr.join(' ');
}

// export function in module
module.exports = {
  processBiteData: processBiteData,
};
