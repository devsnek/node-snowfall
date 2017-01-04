# Snowfall
A Snowflake generator and deconstructor.

[![npm](https://img.shields.io/npm/v/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![npm](https://img.shields.io/npm/dt/snowfall.svg?maxAge=3600)](https://www.npmjs.com/package/snowfall)
[![David](https://david-dm.org/guscaplan/node-snowfall.svg)](https://david-dm.org/guscaplan/snowfall)

[![NPM](https://nodei.co/npm/snowfall.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/snowfall/)

```js
const Snowfall = require('snowfall');

const flurry = new Snowfall({
  epoch: Snowfall.EPOCHS.Discord,
  workerID: 7,
  processID: 21,
});

const flake = flurry.next(); // get the latest snowflake

console.log(flurry.deconstruct(flake));
```
