const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const barerToken = req.headers['Authorization'];
    if (!barerToken) {
    return res.status(401).json({ error: 'Non sei loggato' });
    }
    const token = barerToken.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req["user"] = payload;
    next();
}