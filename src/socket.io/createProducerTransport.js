const Mediasoup = require('../mediasoup');
const Utils = require('../utils');

const createProducerTransport = async ({ data, callback }) => {
  try {
    const { transport, params } = await Mediasoup.createWebRtcTransport({
      router: Mediasoup.getRouter(),
    });
    Mediasoup.transports.producer[data.uuid] = transport;
    Utils.logger.info(`producer transport created: ${data.uuid}`);
    callback(params);
  } catch (err) {
    Utils.logger.error(err);
    callback({ error: err.message });
  }
};

module.exports = createProducerTransport;
