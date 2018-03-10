'use strict';

const EPOCHS = {
  UNIX: 0n,
  TWITTER: 1288834974657n,
  DISCORD: 1420070400000n,
};

class Snowfall {
  static EPOCHS = EPOCHS;
  #workerId;
  #processId;
  #interval;
  #epoch;

  constructor({ workerID, processID, interval, epoch } = {}) {
    this.#workerId = workerID || 0n;
    this.#processId = processID || 0n;
    this.#interval = interval || 0n;
    this.#epoch = epoch || 0n;
  }

  /**
  * Generate a Snowflake
  * @returns {Snowflake} The generated Snowflake
  */
  next({ timestamp, interval = this.#interval++ } = {}) {
    const t = (timestamp || BigInt(Date.now())) - this.#epoch;
    return (t * (1n << 22n)) +
      (this.#workerId * (1n << 17n)) +
      (this.#processId * (1n << 12n)) +
      (interval % 4096n);
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {BigInt} [epoch=this.epoch] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  deconstruct(snowflake, epoch = this.#epoch) {
    snowflake = BigInt(snowflake);
    return {
      timestamp: (snowflake >> 22n) + epoch,
      workerId: (snowflake >> 17n) & 0b11111n,
      processId: (snowflake >> 12n) & 0b11111n,
      interval: snowflake & 0b111111111111n,
    };
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {BigInt} [epoch=0n] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  static deconstruct(snowflake, epoch = 0n) {
    return Snowfall.prototype.deconstruct(snowflake, epoch);
  }
}

module.exports = Snowfall;
