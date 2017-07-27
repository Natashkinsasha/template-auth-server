import express from 'express';

export default ({authController, passport}) =>
    express
        .Router()
        .post('/registration', authController.registration)
        .post('/login', passport.authenticate('local'))
        .get('/facebook', passport.authenticate('facebook'))
        .get('/facebook/callback', passport.authenticate('facebook'))
