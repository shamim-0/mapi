const { Server } = require('socket.io');
const Utils = require('../utils');
const Mediasoup = require('../mediasoup');
const joinRoom = require('./joinRoom');
const getRouterRtpCapabilities = require('./getRouterRtpCapabilities');
const createProducerTransport = require('./createProducerTransport');
const createConsumerTransport = require('./createConsumerTransport');
const connectProducerTransport = require('./connectProducerTransport');
const connectConsumerTransport = require('./connectConsumerTransport');
const produce = require('./produce');
const consume = require('./consume');
const resume = require('./resume');
const join = require('./join');
const leave = require('./leave');
const closeProducer = require('./closeProducer');
const message = require('./message');

let io;
const map = {};

const init = ({ httpServer }) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  Utils.io = io;

  io.on('connection', (socket) => {
    Utils.logger.info(`a user connected: ${socket.id}`);

    socket.emit('welcome', socket.id);

    socket.on('joinRoom', (data, callback) => joinRoom({ socket, data, callback }));
    socket.on('getRouterRtpCapabilities', (data, callback) => getRouterRtpCapabilities({ socket, data, callback }));
    socket.on('createProducerTransport', (data, callback) => createProducerTransport({ socket, data, callback }));
    socket.on('createConsumerTransport', (data, callback) => createConsumerTransport({ socket, data, callback }));
    socket.on('connectProducerTransport', (data, callback) => connectProducerTransport({ socket, data, callback }));
    socket.on('connectConsumerTransport', (data, callback) => connectConsumerTransport({ socket, data, callback }));
    socket.on('produce', (data, callback) => produce({ socket, data, callback }));
    socket.on('consume', (data, callback) => consume({ socket, data, callback }));
    socket.on('resume', (data, callback) => resume({ socket, data, callback }));
    socket.on('join', (data, callback) => join({ socket, data, callback }));
    socket.on('leave', (data, callback) => leave({ socket, data, callback }));
    socket.on('closeProducer', (data, callback) => closeProducer({ socket, data, callback }));
    socket.on('message', (data, callback) => message({ socket, data, callback }));
    socket.on('uuid', (uuid) => {
      map[uuid] = socket.id;
    });

    socket.on('disconnect', () => {
      Utils.logger.info(`a user disconnected: ${socket.id}`);
      Object.keys(map).forEach((uuid) => {
        if (map[uuid] === socket.id) {
          map[uuid] = null;
          if (!map[uuid]) {
            if (Mediasoup.peers[Mediasoup.room[uuid]]) {
              delete Mediasoup.peers[Mediasoup.room[uuid]][uuid];
            }

            if (Mediasoup.activeProducers[Mediasoup.room[uuid]]) {
              let index = null;
              do {
                index = Mediasoup.activeProducers[Mediasoup.room[uuid]]
                  .findIndex((e) => e.uuid === uuid);
                if (index !== -1) {
                  Mediasoup.activeProducers[Mediasoup.room[uuid]].splice(index, 1);
                  index = null;
                }
              } while (index === null);
            }

            Utils.io.to(Mediasoup.room[uuid]).emit('peers', { peers: Mediasoup.peers[Mediasoup.room[uuid]] });
          }
        }
      });
    });
  });

  setTimeout(() => {
    io.emit('reload');
  }, 1000);

  Utils.logger.info('socket.io listening for events');
};

const getIO = () => {
  return io;
};

const SocketIO = {
  init,
  getIO,
};

module.exports = SocketIO;
