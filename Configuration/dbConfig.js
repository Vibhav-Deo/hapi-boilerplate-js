require('dotenv').config();
export const CONFIG = {
  ADAPTER: process.env.DB_ADAPTER,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DBNAME: process.env.DB_DATABASE,
};
