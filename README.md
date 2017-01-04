# Snowfall
A Snowflake generator and deconstructor.

[![npm](https://img.shields.io/npm/v/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![npm](https://img.shields.io/npm/dt/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![David](https://david-dm.org/guscaplan/node-snowfall.svg)](https://david-dm.org/guscaplan/snowfall)

[![NPM](https://nodei.co/npm/snowfall.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/snowfall/)

```js
const Snowfall = require('snowfall');

const flurry = new Snowfall({
  epoch: Snowfall.EPOCHS.DISCORD,
  workerID: 7,
  processID: 21,
});

// generate a new snowflake
let flake = flurry.next();

// generate a snowflake with a custom date and sequence
flake = flurry.next({ date: new Date('2015-01-01'), sequence: 0 });

console.log(flurry.deconstruct(flake));
```
