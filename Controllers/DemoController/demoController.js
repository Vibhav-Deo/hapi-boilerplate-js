const JOI = require('@hapi/joi');
const CONFIG = require('../../Configuration/appConstants');
const UNIVERSAL_FUNCTIONS = require('../../Utilities');

var demoApi = {
  method: 'GET',
  path: '/demo/api/login',
  options: {
    description: 'Demo API',
    tags: ['api', 'demo'],
    auth: {
      mode: 'required',
    },
    validate: {
      query: JOI.object({
        username: JOI.string().required(),
        password: JOI.string().required(),
      }),
    },
    handler: async function (request, h) {
      console.log('==========>',request)
      const req = require('request');
      var options = {
        method: 'POST',
        url:
          'http://suitecrm:8080/service/v4_1/rest.php?method=login&input_type=JSON&response_type=JSON&rest_data={"user_auth":{"user_name":"' +
          request.query.username +
          '","password":"' +
          request.query.password +
          '","version":"1.2"},"application":"medicare"}',
        headers: {},
      };
      return await request(options, async function (error, response) {
        if (error) return await UNIVERSAL_FUNCTIONS.sendError(error);
        console.log(response.body);
        return await UNIVERSAL_FUNCTIONS.sendSuccess(response.body, 'SUCCESS');
      });
    },
    plugins: {
      'hapi-swagger': {
        responseMessages: CONFIG.SWAGGER_RESPONSES,
      },
    },
  },
};

module.exports = [demoApi];
