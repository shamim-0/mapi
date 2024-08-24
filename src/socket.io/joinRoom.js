const Mediasoup = require('../mediasoup');

const joinRoom = ({ socket, data, callback }) => {
  if (data && data.key) {
    socket.join(data.key);
    Mediasoup.room[data.uuid] = data.key;
    callback(data.key);
  } else {
    callback(null);
  }
};

module.exports = joinRoom;
