// http://nodejs.cn/api/assert.html

// const assert = require('assert').strict

// const { message } = new assert.AssertionError({
//   actual: 1,
//   expected: 2,
//   operator: 'strictEqual'
// })

// try {
//   assert.strictEqual(1, 2)
// } catch (err) {
//   assert(err instanceof assert.AssertionError);
//   assert.strictEqual(err.message, message);
//   assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
//   assert.strictEqual(err.actual, 1);
//   assert.strictEqual(err.expected, 2);
//   assert.strictEqual(err.code, 'ERR_ASSERTION');
//   assert.strictEqual(err.operator, 'strictEqual');
//   assert.strictEqual(err.generatedMessage, true);
// }

const assert = require('assert');

const obj1 = {
  a: {
    b: 1
  }
};
const obj2 = {
  a: {
    b: 2
  }
};
const obj3 = {
  a: {
    b: 1
  }
};
const obj4 = Object.create(obj1);

assert.deepEqual(obj1, obj1);
// OK

// Values of b are different:
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// OK

// Prototypes are ignored:
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } deepEqual {}