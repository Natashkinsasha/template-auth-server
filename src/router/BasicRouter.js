import express from 'express';

export default ({authRouter}) =>{
    return express
        .Router()
        .use('/auth', authRouter)
        .get('/', (req, res) => {
            return res.status(200).send('hellow');
        });
}

