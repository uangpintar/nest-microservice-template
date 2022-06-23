export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  GOOGLE_CREDENTIALS_KEY: process.env.GOOGLE_CREDENTIALS_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
});
