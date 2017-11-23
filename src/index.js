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
  *   ms since epoch (discord in this example)   worker  pid     interval
  * ```
  * Note: this generator hardcodes the worker id as 1 and the process id as 0
  * @typedef {string} Snowflake
  */
class Snowfall {
  constructor({ workerID, processID, interval, epoch } = {}) {
    this.workerID = workerID || 0;
    this.processID = processID || 0;
    this._interval = interval || 0;
    this.epoch = epoch || COMMON_EPOCHS.UNIX;
  }

  get interval() {
    if (this._interval > Number.MAX_SAFE_INT)
      this._interval = 0;
    return this._interval++ % 4096;
  }

  /**
  * Generate a Snowflake
  * @returns {Snowflake} The generated Snowflake
  */
  next({ date, interval = this.interval } = {}) {
    const timestamp = ((date || Date.now()) - this.epoch).toString(2).padStart(42, '0');
    const worker = this.workerID.toString(2).padStart(5, '0');
    const process = this.processID.toString(2).padStart(5, '0');
    interval = interval.toString(2).padStart(12, '0');
    const binary = `${timestamp}${worker}${process}${interval}`;
    return BigInt.parseInt(binary, 2).toString();
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {number} [epoch=this.epoch] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  deconstruct(snowflake, epoch = this.epoch) {
    const binary = BigInt.parseInt(snowflake).toString(2).padStart(64, '0');
    return {
      timestamp: parseInt(binary.substring(0, 42), 2) + epoch,
      workerID: parseInt(binary.substring(42, 47), 2),
      processID: parseInt(binary.substring(47, 52), 2),
      interval: parseInt(binary.substring(52, 64), 2),
      binary,
      get date() {
        return new Date(this.timestamp);
      },
    };
  }

  /**
   * Deconstruct a Snowflake
   * @param {Snowflake} snowflake Snowflake to deconstruct
   * @param {number} [epoch=0] Epoch used to calculate the date
   * @returns {DeconstructedSnowflake} Deconstructed snowflake
   */
  static deconstruct(snowflake, epoch) {
    return this.prototype.deconstruct(snowflake, epoch);
  }
}

Snowfall.EPOCHS = COMMON_EPOCHS;

module.exports = Snowfall;
