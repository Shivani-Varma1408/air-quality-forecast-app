const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 1800 }); // 30 min TTL

module.exports = cache;
