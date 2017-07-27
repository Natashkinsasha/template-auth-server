import config from 'config';
import JWTRedis from 'jwt-redis';

import './lib/DB';
import User from './model/User';
import Passport from './middleware/passport';
import HttpServer from './server/HttpServer';
import App from './server/App';
import BasicRouter from './router/BasicRouter';
import AuthRouter from './router/AuthRouter';
import AuthController from './controller/AuthController';
import UserService from './service/UserService';
import RedisMockClient from './lib/MockRedisClient';

const redisClient = new RedisMockClient();
const jwtRedis = new JWTRedis(redisClient);
const userService = new UserService({User});
const passport = new Passport({userService});
const authController = new AuthController({jwtRedis, userService});
const authRouter = new AuthRouter({authController, passport});
const basicRouter = new BasicRouter({authRouter});
const app = new App({passport, basicRouter});
const httpServer = new HttpServer(app);
httpServer.start();