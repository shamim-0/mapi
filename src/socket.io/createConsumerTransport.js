const Mediasoup = require('../mediasoup');
const Utils = require('../utils');

const createConsumerTransport = async ({ data, callback }) => {
  try {
    const { transport, params } = await Mediasoup.createWebRtcTransport({
      router: Mediasoup.getRouter(),
    });
    Mediasoup.transports.consumer[data.uuid] = transport;
    Utils.logger.info(`consumer transport created: ${data.uuid}`);
    callback(params);
  } catch (err) {
    Utils.logger.error(err);
    callback({ error: err.message });
  }
};

module.exports = createConsumerTransport;
