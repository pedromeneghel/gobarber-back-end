export default {
  jwt: {
    secret: process.env.APP_SECRETS,
    expiresIn: '1d',
  },
};
