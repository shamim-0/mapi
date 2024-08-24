const Mediasoup = require('../mediasoup');
const Utils = require('../utils');

const connectConsumerTransport = async ({ data, callback }) => {
  await Mediasoup.transports.consumer[data.uuid].connect({
    dtlsParameters: data.dtlsParameters,
  });

  Utils.logger.info(`consumer transport connected: ${data.uuid}`);
  callback();
};

module.exports = connectConsumerTransport;
