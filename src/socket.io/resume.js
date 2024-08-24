const Mediasoup = require('../mediasoup');

const resume = async ({ data, callback }) => {
  if (!Mediasoup.consumers[data.key]) {
    Mediasoup.consumers[data.key] = {};
  }

  await Mediasoup.consumers[data.key][data.consumerId].resume();
  callback();
};

module.exports = resume;
