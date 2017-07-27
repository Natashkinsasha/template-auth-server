import mongoose from 'mongoose';
import config from 'config';
import Promise from 'bluebird';
import logger from '../lib/logger';


export default function DB() {
    const dbUri = `mongodb://${config.get('mongoDb.user')}:${config.get('mongoDb.password')}${config.get('mongoDb.host')}:${config.get('mongoDb.port')}/${config.get('mongoDb.db')}`;

    mongoose.Promise = Promise;

    mongoose.connection.on('connected', () => {
        logger.info('Mongoose default connection open to ' + dbUri);
    });

    mongoose.connection.on('error', (err) => {
        logger.info('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('Mongoose default connection disconnected');
    });

    mongoose.connection.on('open', () => {
        logger.info('Mongoose default connection is open');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(function () {
            logger.info('Mongoose default connection disconnected through app termination');
        });
    });

    return mongoose.connect(dbUri);
}
