// bitefunc.js


function processBiteData(bites){
  // console.log(bites);
  // let validBites = [];
  // let numBites = 0;

  let ages = [];
  let agesSum = 0;
  let avgAge = 0;

  let spayNeutValid = [];
  let spayNeut = [];
  let spayNeutPecent = 0;

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
    if (bite.spayNeuter === 'true') {
      spayNeutValid.push(bite.spayNeuter === 'true');
    } else if(bite.spayNeuter === 'false') {
      spayNeutValid.push(bite.spayNeuter === 'true');
    }

    // zip codes should be integers
    if (!isNaN(bite.zipCode)) {
      bite.zipCode = parseInt(bite.zipCode, 10);
    }
  });

  // convert every valid age from string to integer using array map
  ages = ages.map(age =>  age = parseInt(age,10));
  // console.log(ages.length);
  // use reduce to sum up all ages
  agesSum = ages.reduce((acc, curr) => acc + curr, 0);
  // find average age
  avgAge = agesSum / ages.length;
  console.log('Average age of these chompy friends is: ' + avgAge.toFixed(2) + '\n');

  // use filter to find number of spay/neutered dogs
  spayNeut = spayNeutValid.filter(bool => bool === true);
  console.log('The percentage of biting dogs that are spayed/neutered: ' + (spayNeut.length / spayNeutValid.length * 100).toFixed(2) + '%');

  let breedBites = [];

  // create new objects that contain breed and its number of bites
  bites.forEach(function(bite) {
    // do not count any breeds that are empty, undefined, or unknown
    if (bite.Breed !== '' && bite.Breed !== undefined && bite.Breed.toUpperCase() !== 'UNKNOWN') {
      // get rid of double quotes
      bite.Breed = bite.Breed.toUpperCase().replace(/\"/g, "");
      // console.log(bite.Breed.toUpperCase());

      // if the array breedBites already contains that breed object, incement counter

      // else make breed object with counter property and add it to array

    }
  });
}


// export function in module
module.exports = {
  processBiteData: processBiteData,
};
