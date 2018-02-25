const COMMON_EPOCHS = {
  UNIX: 0n,
  TWITTER: 1288834974657n,
  DISCORD: 1420070400000n,
};

const MASKS = {
  WORKER_ID: 0b1111100000000000000000n,
  PROCESS_ID: 0b11111000000000000n,
  INTERVAL: 0b111111111111n,
};

class Snowfall {
  constructor({ workerID, processID, interval, epoch } = {}) {
    this.workerId = workerID || 0n;
    this.processId = processID || 0n;
    this.interval = interval || 0n;
    this.epoch = epoch || 0n;
  }

  /**
  * Generate a Snowflake
  * @returns {Snowflake} The generated Snowflake
  */
  next({ timestamp, interval = this.interval++ } = {}) {
    const p = (n, e) => n * (1n << e);
    const t = (timestamp || BigInt(Date.now())) - this.epoch;
    return p(t, 22n) + p(this.workerId, 17n) + p(this.processId, 12n) + (interval % 4096n);
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
      workerId: (snowflake & MASKS.WORKER_ID) >> 17n,
      processId: (snowflake & MASKS.PROCESS_ID) >> 12n,
      interval: (snowflake & MASKS.INTERVAL),
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

Snowfall.EPOCHS = COMMON_EPOCHS;

module.exports = Snowfall;
