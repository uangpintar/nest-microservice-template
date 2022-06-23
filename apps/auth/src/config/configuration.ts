export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3001,
  GOOGLE_CREDENTIALS_KEY: process.env.GOOGLE_CREDENTIALS_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_SECRET: process.env.JWT_SECRET,
});
