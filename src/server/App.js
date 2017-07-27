import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import config from 'config';

import errorHandler from '../middleware/errorHandler';
import logger from '../middleware/logger';
import validator from '../middleware/validator';

export default({basicRouter, passport}) => {
    const app = express();
    app.use(helmet());
    app.use(logger());
    app.use(cookieParser());
    app.use(cookieSession(config.get('session')));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(validator());
    app.use(`/${config.get('version')}/api`, basicRouter);
    app.use(errorHandler());
    return app;
}


