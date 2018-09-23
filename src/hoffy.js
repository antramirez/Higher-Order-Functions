// hoffy.js

function longestString(...sN) {
  // make sure arguments were actually pased into function
  if (sN.length > 0) {
    // put all strings into one array
    const allStrings = Array.prototype.slice.call(arguments);
    // compare the length of the current string to the longest string previously found
    // and if current string is longer, that becomes the longest string
    const longest = allStrings.reduce((max,curr) => curr.length >= max.length ? curr : max);
    return longest;
  }
  // return undefined if no arguments passed in
  return undefined;
}

function maybe(fn) {
  // create new function
  function newFunc(...args) {
    // return value will be function passed in as argument
    const func = fn(...args);
    // make array out of function's arguments
    const allArgs = Array.prototype.slice.call(args);
    // return undefined if any argument is null
    if (allArgs.includes(null) || allArgs.includes(undefined)) {
      return undefined;
    }
    // return function fn if it gets to here
    return func;
  }
  // return new function that was just created
  return newFunc;
}

function filterWith(fn) {
  // create new function
  function newFunc(arg) {
    // call filter on array that was passed in as argument to fn
    const newArr = arg.filter(fn);
    // return filtered array
    return newArr;
  }

  // return new function that was just created that returns filterd array
  return newFunc;
}

function steppedForEach(arr, fn, step) {
  const len = arr.length;
  // accumulators
  let start = -step;
  let next = 0;

  function newFunc (arg) {
    // increase start and end indices
    start += step;
    next += step;

    // recursion base case when there are no more elements remaining
    if (start >= len) {
      return;
    }

    // store sliced array into new aray
    const newArr = arg.slice(start,next);
    // use apply on function parameter to unpack newArr into separate arguments
    fn.apply(null, newArr);

    // recursive call
    newFunc(arg);
  }

  // call recursive function on the array passed in as parameter
  newFunc(arr);
}

function constrainDecorator(fn, min, max) {
  // create new function that modifies fn
  function newFunc() {
    // make sure min and max are set
    if (min !== null && max !== null) {
      // use apply on fn to get hold of its return value
      const retVal = fn.apply(null, arguments);
      // set the return value of this new function to min if retVal < min
      // and max if retVal > max
      if (retVal < min) {
        return fn(min);
      }
      if (retVal > max) {
          return fn(max);
      }
    }
    // return regular return value of fn if min or max are not set
    const retVal = fn.apply(null, arguments);
    return retVal;
  }

  // return modified function
  return newFunc;
}

function limitCallsDecorator(fn, n) {
  // accumulator
  let counter = 0;
  // new function returns undefined if fn is called >n times
  // otherwise returns fn
  function newFunc(...args) {
    if (counter < n) {
      // increase number of times function was called
      counter++;
      return fn(...args);
    }
    // return undefined once counter is 0
    return undefined;
  }

  // return new function
  return newFunc;
}

function bundleArgs(fn, args1, ...argsN) {
  // create new function that accepts arbitrary number of arguments
  function newFunc(...newArgs) {
    // return fn with args1 - argsn as arguments, in addition to new arguments
    const f = fn(args1, ...argsN, ...newArgs);
    return f;
  }

  // return new function
  return newFunc;
}

function sequence(...fnN) {
  // create a new function that accepts 1 argument and uses reduce to continue 
  // to pass one function's return value as the next function's argument
  function newFunc(arg) {
    // put every argument of sequence (they're functions) into array
    const funcArr = [...fnN];
    // set return value to previous function's return value
    const retVal = funcArr.reduce((ret,fn) => fn(ret), arg);
    return retVal;
  }

  // return new function
  return newFunc;
}

module.exports = {
  longestString: longestString,
  maybe: maybe,
  filterWith: filterWith,
  steppedForEach: steppedForEach,
  constrainDecorator: constrainDecorator,
  limitCallsDecorator: limitCallsDecorator,
  bundleArgs: bundleArgs,
  sequence: sequence
};
