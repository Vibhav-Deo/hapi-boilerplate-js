'use strict';

const CONFIG = require('./Configuration/appConstants')
const ROUTES = require('./Controllers');
const debug = require('debug')('app:SERVER-->');
const PLUGINS = require('./Plugins/plugins');
const GLUE = require('@hapi/glue');
const APP_SECRET = process.env.APP_SECRET;
const AUTH_SERVICE = require('./Services');
const init = async () => {
  const manifest = {
    server: {
      app: { name: CONFIG.SERVER.APP_NAME },
      port: process.env.PORT || CONFIG.SERVER.PORT,
      host: CONFIG.SERVER.HOST,
      routes: {
        cors: true
      }
    },
    register: {
      plugins: [...PLUGINS]
    }
  };

  const options = {
    relativeTo: __dirname,
  };

  var server = await GLUE.compose(manifest, options);

  server.auth.strategy('jwt', 'jwt', {
    keys: APP_SECRET,
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return AUTH_SERVICE.verifyToken(artifacts, APP_SECRET);
    },
  });

  // Set the strategy

  server.auth.default('jwt');

  //add views
  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: './Views',
  });

  //Default Routes
  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: false,
    },
    handler: function (req, res) {
      return res.view('welcome');
    },
  });

  try {
    ROUTES.forEach((route) => {
      server.route(route);
    });
  } catch (error) {
    debug('Error while fetching routes', error);
  }

  server.events.on('response', (request) => {
    debug(
      request.info.remoteAddress +
        ': ' +
        request.method.toUpperCase() +
        ' ' +
        request.url.pathname +
        ' --> ' +
        request.response.statusCode
    );
    if (request.payload) debug('Request payload:', request.payload);
    if (request.params) debug('Request params:', request.params);
  });

  //Register plugins

  await server.start();
  debug('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (error) => {
  debug(error);
  process.exit(1);
});

try {
  init();
} catch (error) {
  debug(error);
}
