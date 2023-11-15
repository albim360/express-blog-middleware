const fs = require('fs');
const path = require('path');

function errorHandle(err, req, res) {
    res.status(500).json({ error: 'Errore interno del server' });
  }
  
  module.exports = errorHandle;
  