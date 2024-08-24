const Mediasoup = require('../mediasoup');
const Utils = require('../utils');

const connectProducerTransport = async ({ data, callback }) => {
  await Mediasoup.transports.producer[data.uuid].connect({
    dtlsParameters: data.dtlsParameters,
  });

  Utils.logger.info(`producer transport connected: ${data.uuid}`);
  callback();
};

module.exports = connectProducerTransport;
