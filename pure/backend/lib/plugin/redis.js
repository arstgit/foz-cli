let config = require("config-lev");
let Redis = require("ioredis");
let opt = {
  port: config.port,
  host: config.host
};
let redis = new Redis(opt);

module.exports = redis;
