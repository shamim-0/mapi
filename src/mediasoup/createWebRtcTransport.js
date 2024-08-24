const config = require('../../config');

const createWebRtcTransport = async ({ router }) => {
  const transport = await router.createWebRtcTransport({
    listenInfos: [
      { protocol: 'tcp', ip: config.ipAddress.ip, announcedAddress: config.ipAddress.announcedIp },
      { protocol: 'udp', ip: config.ipAddress.ip, announcedAddress: config.ipAddress.announcedIp },
    ],
    initialAvailableOutgoingBitrate: 1000000,
  });
  await transport.setMaxIncomingBitrate(1500000);
  return {
    transport,
    params: {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    },
  };
};

module.exports = createWebRtcTransport;
