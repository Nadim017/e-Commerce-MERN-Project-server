require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongoDBURL = process.env.MONGODB_ATLAS_URL;
const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'hsohJSFWSFKFP$%$&&';
const smtpUserName = process.env.SMTP_USERNAME || '';
const smtpUserPassword = process.env.SMTP_PASSWORD || '';
const clientURL = process.env.CLIENT_URL;
module.exports = {
  serverPort,
  mongoDBURL,
  defaultImagePath,
  jwtActivationKey,
  smtpUserName,
  smtpUserPassword,
  clientURL,
};
