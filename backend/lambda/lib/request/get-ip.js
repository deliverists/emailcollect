module.exports = ({
  ip,
  requestContext: {
    identity: { sourceIp },
  },
}) => ip || sourceIp
