const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');


const homeController = require('./controllers/home');
const postsController = require('./controllers/posts'); 

const postRouter = require('./routers/posts'); 

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", homeController.index);

// Usa il router dei post
app.use('/posts', postRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Pagina non trovata' });
});

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
