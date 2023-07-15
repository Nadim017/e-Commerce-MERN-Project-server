require('dotenv').config();
const serverPort = process.env.SERVER_PORT || 3002;
const mongoDBURL = process.env.MONGODB_ATLAS_URL;
const defaultImagePath =
  process.env.DEFAULT_USER_IMAGE_PATH || 'public/images/users/default.png';
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'hsohJSFWSFKFP$%$&&';
module.exports = { serverPort, mongoDBURL, defaultImagePath, jwtActivationKey };
