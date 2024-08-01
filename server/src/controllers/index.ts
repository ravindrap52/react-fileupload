import express from 'express';
import readCSVFileController from './v1/readCSVFile';

const router = express.Router();

interface IRoutes {
  [index: string]: express.Router;
}

//TODO move this to a seperate file
const routes: IRoutes = {
  '/v1/readCSVFile': readCSVFileController // base route
};

Object.entries(routes).map(([path, controllerFunction]: [string, express.Router]) => {
  router.use(path, controllerFunction);
});

export default router;