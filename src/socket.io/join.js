const xss = require('xss');
const Mediasoup = require('../mediasoup');
const Utils = require('../utils');

const join = async ({ data, callback }) => {
  if (!Mediasoup.peers[data.key]) {
    Mediasoup.peers[data.key] = {};
  }
  if (!Mediasoup.activeProducers[data.key]) {
    Mediasoup.activeProducers[data.key] = [];
  }

  Mediasoup.peers[data.key][data.uuid] = {
    name: xss(data.name),
    email: xss(data.email),
  };
  Utils.io.to(data.key).emit('peers', {
    peers: Mediasoup.peers[data.key],
  });
  callback({
    peers: Mediasoup.peers[data.key],
    producers: Mediasoup.activeProducers[data.key],
  });
};

module.exports = join;
