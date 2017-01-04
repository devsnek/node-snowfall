# Snowfall
A Snowflake generator and deconstructor.

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
