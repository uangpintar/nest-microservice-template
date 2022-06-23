export default () => ({
  GOOGLE_CREDENTIALS_KEY: process.env.GOOGLE_CREDENTIALS_KEY,
  PORT: parseInt(process.env.PORT, 10) || 3002,
});
