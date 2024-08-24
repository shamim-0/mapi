const mediasoup = require('mediasoup');
const createWebRtcTransport = require('./createWebRtcTransport');
const createConsumer = require('./createConsumer');
const config = require('../../config');
const Utils = require('../utils');

let worker;
let router;

const init = async () => {
  worker = await mediasoup.createWorker({
    rtcMinPort: config.rtcMinPort,
    rtcMaxPort: config.rtcMaxPort,
    logLevel: config.mediasoupLogLevel,
  });
  worker.on('died', () => {
    Utils.logger.error('mediasoup worker died');
  });
  Utils.logger.info('mediasoup worker running');

  router = await worker.createRouter({ mediaCodecs: config.mediaCodecs });
  Utils.logger.info('mediasoup router online');
  Utils.logger.info(`mediasoup ip is ${config.ipAddress.ip}`);
  if (config.ipAddress.announcedIp) {
    Utils.logger.info('ip configuration is mapped behind nat');
  }
};

const getWorker = () => {
  return worker;
};

const getRouter = () => {
  return router;
};

const Mediasoup = {
  init,
  createWebRtcTransport,
  createConsumer,
  getWorker,
  getRouter,
  rtpCapabilities: mediasoup.getSupportedRtpCapabilities(),
  transports: {
    producer: [],
    consumer: [],
  },
  producers: {},
  activeProducers: [],
  consumers: {},
  peers: {},
  room: {
    'user-id': 'room-key',
  },
};

module.exports = Mediasoup;
