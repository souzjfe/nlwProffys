import express from 'express';
import classesControl from './controllers/classesController';
import connectionsControl from './controllers/connectionsController';

const routes = express.Router();

const controlClasses = new classesControl;
const controlConnections = new connectionsControl;
routes.post('/classes',controlClasses.create);
routes.get('/classes',controlClasses.index);
routes.post('/connections',controlConnections.create);
routes.get('/connections',controlConnections.index);
export default routes;