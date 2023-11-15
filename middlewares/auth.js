const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

module.exports = function (req, res, next) {
    const bearerToken = req.headers['authorization'];
    console.log('Received Token:', bearerToken);

    if (!bearerToken) {
        return res.status(401).json({ error: 'Non sei loggato' });
    }

    try {
        const token = bearerToken.replace('Bearer ', '');
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).json({ error: 'Token non valido' });
    }
}
