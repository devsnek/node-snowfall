const assert = require('assert');
const Snowfall = require('../src');

const flurry = new Snowfall({ epoch: Snowfall.EPOCHS.DISCORD });

let flake = flurry.next();

flake = flurry.next({
  date: new Date('2015-01-01'),
});
assert.strictEqual(flake, '1');

flake = flurry.next({
  date: new Date('2015-01-01'),
});
assert.strictEqual(flake, '2');

flake = flurry.next({
  date: new Date('2015-01-01'),
  interval: 0,
});
assert.strictEqual(flake, '0');
