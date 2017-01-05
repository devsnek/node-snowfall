const Snowfall = require('../src');

const flurry = new Snowfall({ epoch: Snowfall.EPOCHS.DISCORD });

function assert(a, b) {
  if (a !== b) throw new Error(`${a} does not equal ${b}!`);
  console.log(`${a} is equal to ${b}!`); // eslint-disable-line no-console
}

let flake = flurry.next();

flake = flurry.next({
  date: new Date('2015-01-01'),
});
assert(flake, '1');

flake = flurry.next({
  date: new Date('2015-01-01'),
});
assert(flake, '2');

flake = flurry.next({
  date: new Date('2015-01-01'),
  interval: 0,
});
assert(flake, '0');
