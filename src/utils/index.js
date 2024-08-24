const pino = require('pino');

const Utils = {
  io: null,
  logger: pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
};

module.exports = Utils;
