import winston from 'winston';
import config from 'config';

const level = config.get('level');

const logger = new (winston.Logger)({
    level: level,
    transports: [
        new (winston.transports.Console)(),
    ],
});

export default logger;