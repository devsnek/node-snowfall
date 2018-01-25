const COMMON_EPOCHS = {
  UNIX: 0n,
  TWITTER: 1288834974657n,
  DISCORD: 1420070400000n,
};

/**
  * A Snowflake, based off of the twitter snowflake
  * ```
  * If we have a snowflake '266241948824764416' we can represent it as binary:
  *
  * 64                                          22     17     12          0
  *  000000111011000111100001101001000101000000  00001  00000  000000000000
  *   ms since epoch (discord in this example)   worker  pid     interval
  * ```
  * Note: this generator hardcodes the worker id as 1 and the process id as 0
  * @typedef {string} Snowflake
  */
class Snowfall {
  constructor({ workerID, processID, interval, epoch } = {}) {
    this.workerId = workerID || 0n;
    this.processId = processID || 0n;
    this._interval = interval || 0n;
    this.epoch = epoch || 0n;
  }

  get interval() {
    return this._interval++ % 4096n;
  }

  /**
  * Generate a Snowflake
  * @returns {Snowflake} The generated Snowflake
  */
  next({ timestamp, interval = this.interval } = {}) {
    const p = (n, e) => n * (2n ** e);
    const t = (timestamp || BigInt(Date.now())) - this.epoch;
    return p(t, 22n) + p(this.workerId, 17n) + p(this.processId, 12n) + interval;
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {BigInt} [epoch=this.epoch] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  deconstruct(snowflake, epoch = this.epoch) {
    snowflake = BigInt(snowflake);
    return {
      timestamp: (snowflake >> 22n) + epoch,
      workerId: (snowflake & 4063232n) >> 17n,
      processId: (snowflake & 126976n) >> 12n,
      interval: (snowflake & 4095n),
    };
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {BigInt} [epoch=0] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  static deconstruct(snowflake, epoch = 0n) {
    return this.prototype.deconstruct(snowflake, epoch);
  }
}

Snowfall.EPOCHS = COMMON_EPOCHS;

module.exports = Snowfall;
