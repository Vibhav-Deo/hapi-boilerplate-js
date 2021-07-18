'use strict';

const HAPI_SWAGGER = require('hapi-swagger');
const INERT = require('@hapi/inert');
const VISION = require('@hapi/vision');
const CONFIG = require('../Configuration/appConstants');
const JWT = require('@hapi/jwt');

const hapiSwaggerOptions = {
  pathPrefixSize: 2,
  info: {
    title: `${CONFIG.SERVER.APP_NAME} API Documentation`,
    description: `${CONFIG.SERVER.APP_NAME} API documentation.`,
  },
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  security: [{ jwt: [] }],
};

const visionOptions = {
  engines: {
    html: require('handlebars'),
  },
  relativeTo: __dirname,
  path: 'public',
};

const PLUGINS = [
  {
    plugin: INERT,
  },
  {
    plugin: VISION,
  },
  {
    plugin: HAPI_SWAGGER,
    options: hapiSwaggerOptions,
  },
  {
    plugin: JWT
  }
];

module.exports = PLUGINS;
