const express = require('express');
const router = express.Router();
const generateJWT = require('../utilities/generateJTW');
const users = require('../data/users');

// Rotta per il login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Trova l'utente con le credenziali corrispondenti
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenziali non valide' });
  }

  // Genera il token JWT e restituiscilo nella risposta
  const token = generateJWT(user);
  res.json({ token });
});

module.exports = router;
