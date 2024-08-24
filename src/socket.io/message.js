const xss = require('xss');
const Utils = require('../utils');

const message = async ({ data, callback }) => {
  Utils.logger.info(JSON.stringify(data));
  Utils.io.to(data.key).emit('message', {
    uuid: data.uuid,
    content: xss(data.content),
    name: xss(data.name),
    email: xss(data.email),
  });
  callback();
};

module.exports = message;
