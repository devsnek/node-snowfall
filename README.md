# Snowfall
A Snowflake generator and deconstructor.

[![npm](https://img.shields.io/npm/v/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![npm](https://img.shields.io/npm/dt/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![David](https://david-dm.org/devsnek/node-snowfall.svg)](https://david-dm.org/devsnek/snowfall)

[![NPM](https://nodei.co/npm/snowfall.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/snowfall/)

```javascript
const Snowfall = require('snowfall');

const flurry = new Snowfall({
  epoch: Snowfall.EPOCHS.TWITTER,
  workerID: 7n,
  processID: 21n,
});

// generate a new snowflake
let flake = flurry.next();

// generate a snowflake with a custom date and interval
flake = flurry.next({
  timestamp: BigInt(new Date('2015-01-01').getTime()),
  internval: 10n,
});

console.log(flurry.deconstruct(flake));
```
