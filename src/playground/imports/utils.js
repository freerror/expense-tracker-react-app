// export { remove, flatten as default }

/*
  remove([1, 2, 3, 4, 5, 6], [1, 3, 6]); // [2, 4, 5]
*/
export function remove(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }
  var result = [];
  var len = arr1.length;
  for (var i = 0; i < len; i++) {
    var elem = arr1[i];
    if (arr2.indexOf(elem) == -1) {
      result.push(elem);
    }
  }
  return result;
}

/*
  flatten([[1, [2, 3]], [[4, 5], 6, 7, [8, 9]]]);
  // [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
export function flattenHelper(arr, depth) {
  var stack = arr.slice();
  var result = [];

  while (stack.length) {
    var item = stack.pop();

    if (Array.isArray(item) && depth > 0) {
      stack.push.apply(stack, item);
      depth--;
    } else {
      result.push(item);
    }
  }

  return result.reverse();
}

function flatten(arr, depth) {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }

  if (depth !== undefined && typeof depth !== 'number') {
    throw new Error('depth expects a number');
  }

  return flattenHelper(arr, typeof depth === 'number' ? depth : Infinity);
}
export default flatten

/*
  const cubedRoot = partial(Math.pow, _, 1/3);
  cubedRoot(64); // 4
  const getRoot = partial(Math.pow, 64);
  getRoot(1/2); // 8
*/
export function partial(fn /*, arg1, arg2 etc */) {
  var partialArgs = [].slice.call(arguments, 1);

  if (!partialArgs.length) {
    return fn;
  }

  return function () {
    var args = [].slice.call(arguments);
    var derivedArgs = [];

    for (var i = 0; i < partialArgs.length; i++) {
      var thisPartialArg = partialArgs[i];

      derivedArgs[i] =
        thisPartialArg === undefined ? args.shift() : thisPartialArg;
    }

    return fn.apply(this, derivedArgs.concat(args));
  };
}