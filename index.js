const Utils = require('./src/utils');
const Mediasoup = require('./src/mediasoup');
const HTTPServer = require('./src/http-server');
const SocketIO = require('./src/socket.io');
const config = require('./config');

Utils.logger.info(`argan v${config.version} - honeyside ${new Date().getFullYear()}`);

const init = async () => {
  await config.check();
  await HTTPServer.init();
  await SocketIO.init({
    httpServer: HTTPServer.server,
  });
  await Mediasoup.init();
};

init().then(() => {
  Utils.logger.info('init complete');
});
