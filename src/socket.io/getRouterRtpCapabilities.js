const Mediasoup = require('../mediasoup');

const getRouterRtpCapabilities = ({ callback }) => {
  callback(Mediasoup.getRouter().rtpCapabilities);
};

module.exports = getRouterRtpCapabilities;
