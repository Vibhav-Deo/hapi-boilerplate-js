const JOI = require('@hapi/joi');
const CONFIG = require('../../Configuration/appConstants');
const UNIVERSAL_FUNCTIONS = require('../../Utilities');
const AUTH_SERVICE = require('../../Services')

var authApi = {
  method: 'GET',
  path: '/auth/api/token',
  options: {
    description: 'Token API',
    tags: ['api', 'token'],
    auth: false,
    handler: async function (request, h) {
      return await AUTH_SERVICE.generateToken(function (
        error,
        data
      ) {
        if (error) return UNIVERSAL_FUNCTIONS.sendError(error);
        else {
          return UNIVERSAL_FUNCTIONS.sendSuccess(data, 'SUCCESS');
        }
      });
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: CONFIG.SWAGGER_RESPONSES,
      },
    },
  },
};

module.exports = [authApi];
