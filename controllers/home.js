const express = require('express');
const fs = require('fs');
const path = require('path');

function index(req, res) {
  res.send(`<h1>Benvenuti nel mio sito di ricette</h1> <br> <a href="/posts"><button>Vai alla lista dei post</button></a>`);
}

module.exports = {
  index,
};
