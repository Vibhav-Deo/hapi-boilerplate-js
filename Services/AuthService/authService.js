// Load modules

const Jwt = require('@hapi/jwt');
require('dotenv').config();
const APP_SECRET = process.env.APP_SECRET;
// Generate a Token

const TOKEN = Jwt.token.generate(
  {
    aud: 'urn:audience:test',
    iss: 'urn:issuer:test',
    user: 'some_user_name',
    group: 'hapi_community',
  },
  {
    key: APP_SECRET,
    algorithm: 'HS512',
  },
  {
    ttlSec: 14400, // 4 hours
  }
);

// Decode a token

const decodedToken = Jwt.token.decode(TOKEN);

// Greate funtion to verify a token

const verifyToken = (artifact, secret, options = {}) => {
  try {
    Jwt.token.verify(artifact, secret, options);
    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      error: err.message,
    };
  }
};

// Get response of a succesful verification

const validResponse = verifyToken(decodedToken, APP_SECRET);

// Get response of a unsuccessful verification due to wrong shared secret

const badSecretResponse = verifyToken(decodedToken, APP_SECRET);

// Get response of a unsuccessful verification due to wrong iss

const badIssResonse = verifyToken(decodedToken, APP_SECRET, {
  iss: 'urn:issuer:different_test',
});

const generateToken = (callback) => {
  let genertedTOken = TOKEN;
  return callback(null, genertedTOken);
};

module.exports = {
  generateToken: generateToken,
  validResponse: validResponse,
  badIssResonse: badIssResonse,
  badSecretResponse: badSecretResponse,
  verifyToken: verifyToken
}
