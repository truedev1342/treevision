import express from 'express';
import * as homeController from '../controllers';

const homeRouter = express.Router();

homeRouter.get('/', homeController.getEmail);

export default homeRouter;