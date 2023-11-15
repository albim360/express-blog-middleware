const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const homeController = require('./controllers/home');
const postsController = require('./controllers/posts'); 
const multer = require('multer');

// Importa il router dei post
const postRouter = require('./routers/posts'); 

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", homeController.index);

// Usa il router dei post
app.use('/posts', postRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
