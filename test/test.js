const assert = require('assert');
const Snowfall = require('../src');

const flurry = new Snowfall({ epoch: Snowfall.EPOCHS.DISCORD });

let flake = flurry.next();

const T = BigInt(new Date('2015-01-01').getTime());

flake = flurry.next({
  timestamp: T,
});
assert.strictEqual(flake, 1n);

flake = flurry.next({
  timestamp: T,
});
assert.strictEqual(flake, 2n);

flake = flurry.next({
  timestamp: T,
  interval: 0n,
});
assert.strictEqual(flake, 0n);
