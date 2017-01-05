const Long = require('./vendor/long.min.js');

function pad(v, n, c = '0') {
  return String(v).length >= n ? String(v) : (String(c).repeat(n) + v).slice(-n);
}

const COMMON_EPOCHS = {
  UNIX: 0,
  TWITTER: 1288834974657,
  DISCORD: 1420070400000,
};

/**
  * A Snowflake, based off of the twitter snowflake
  * ```
  * If we have a snowflake '266241948824764416' we can represent it as binary:
  *
  * 64                                          22     17     12          0
  *  000000111011000111100001101001000101000000  00001  00000  000000000000
  *   ms since epoch (discord in this example)   worker  pid    increment
  * ```
  * Note: this generator hardcodes the worker id as 1 and the process id as 0
  * @typedef {string} Snowflake
  */
class Snowfall {
  constructor({ workerID, processID, sequence, epoch } = {}) {
    this.workerID = workerID || 1;
    this.processID = processID || 1;
    this.sequence = sequence || 0;
    this.epoch = epoch || COMMON_EPOCHS.UNIX;
  }

  /**
  * Generate a Snowflake
  * @returns {Snowflake} The generated Snowflake
  */
  next({ date, sequence } = {}) {
    if (this.sequence >= 4096) this.sequence = 0;
    const TIMESTAMP = pad(((date || Date.now()) - this.epoch).toString(2), 42);
    const WORKER = pad(this.workerID.toString(2), 5);
    const PROCESS = pad(this.processID.toString(2), 5);
    const SEQUENCE = pad((sequence || this.sequence++).toString(2), 12);
    const BINARY = `${TIMESTAMP}${WORKER}${PROCESS}${SEQUENCE}`;
    return Long.fromString(BINARY, 2).toString();
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  deconstruct(snowflake) {
    const BINARY = pad(Long.fromString(snowflake).toString(2), 64);
    return {
      date: new Date(parseInt(BINARY.substring(0, 42), 2) + this.epoch),
      workerID: parseInt(BINARY.substring(42, 47), 2),
      processID: parseInt(BINARY.substring(47, 52), 2),
      sequqnce: parseInt(BINARY.substring(52, 64), 2),
      binary: BINARY,
    };
  }
}

Snowfall.EPOCHS = COMMON_EPOCHS;

module.exports = Snowfall;
