import express from 'express';
import mongoose from 'mongoose';
import httpServer from 'http';
// import { ApolloServer } from 'apollo-server';
import { config } from './config/config';
// import { typeDefs } from './graphql/typeDefs';
// import { resolvers } from './graphql/resolvers';

import controllers from './controllers';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* // Apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
}); */
// When successfully connected
mongoose.connection.on('connected', async () => {
  console.info(`Mongoose default connection open to ${config.mongo.host}`);
  /* const serverInfo = await apolloServer.listen({port: 5000});
  console.info(`Server is running on url ${serverInfo.url}`); */
});

// If the connection throws an error
mongoose.connection.on('error', err => {
  console.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.warn('Mongoose default  connection disconnected');
});

// If the Node process ends, close mongo connection
process.on('SIGINT', () => {
  console.info('Mongoose default connection disconnected');
  mongoose.connection.close();
  process.exit(1);
});

/** Rules of our API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

/** Healthcheck */
app.get('/ping', (req, res) => res.status(200).json({ status: 'success' }));

// Routing: register all routes in the controllers module.
app.use(controllers);

/** Error handling for non matching routes*/
app.use((req, res, next) => {
  res.status(404).json({ status: 404, title: 'Not Found', message: 'Route not found' });
  console.error('Route not found');
  next();
});

export async function listen() {
  console.log({ level: 'info', message: 'Open mongoose connection.' });
  await mongoose.connect(config.mongo.url);
  httpServer
    .createServer(app)
    .listen(config.server.port, () => console.info(`Server is running on port ${config.server.port}`));
}
