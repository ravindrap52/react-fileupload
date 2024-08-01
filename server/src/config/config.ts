import dotenv from 'dotenv';

dotenv.config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_HOST, MONGO_DB_PORT, SERVER_PORT } = process.env;

const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/reactFileupload${process.env.MONGO_AUTHSOURCE}`;

export const config = {
  mongo: {
    url: MONGO_URL,
    host: MONGO_DB_HOST,
    port: MONGO_DB_PORT
  },
  server: {
    port: Number(SERVER_PORT) || 3000
  }
};