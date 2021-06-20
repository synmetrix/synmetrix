import { has } from 'unchanged';

import arrayFromIterator from './arrayFromIterator';
import includesWith from './includesWith';
import functionName from './functionName';
import objectIs from './objectIs';

const type = (val) => {
  return val === null
    ? 'Null'
    : val === undefined
      ? 'Undefined'
      : Object.prototype.toString.call(val).slice(8, -1);
}

function uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  const a = arrayFromIterator(aIterator);
  const b = arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !includesWith(function(b, aItem) {
    return !includesWith(eq, aItem, b);
  }, b, a);
}

export default function equals(a, b, stackA = [], stackB = []) {
  if (objectIs(a, b)) {
    return true;
  }

  const typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) &&
      typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) &&
      typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' &&
        functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && objectIs(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!objectIs(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source &&
          a.global === b.global &&
          a.ignoreCase === b.ignoreCase &&
          a.multiline === b.multiline &&
          a.sticky === b.sticky &&
          a.unicode === b.unicode)) {
        return false;
      }
      break;
    default:
      return false;
  }

  let idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) {
    return false;
  }

  const extendedStackA = stackA.concat([a]);
  const extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    const key = keysA[idx];
    if (!(has(key, b) && equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}