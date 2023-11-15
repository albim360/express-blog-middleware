const fs = require("fs");
const path = require("path");
const posts = require("../db");

// Funzione per la lista dei post
function index(req, res) {
  const postList = posts.map((post) => {
    return `<li>
      <img src="/imgs/posts/${post.image}" style="max-height: 100px; max-width: 200px;">
      <a href="/posts/${post.slug}">${post.title}</a>
    </li>`;
  });

  const html = `<ul>${postList.join("")}</ul>`;
  res.send(html);
}

// Funzione per visualizzare un post tramite slug
function show(req, res) {
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: "Post non trovato" });
  }
}

// Funzione per il download dell'immagine del post
function download(req, res) {
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);

  if (post) {
    const imageFilePath = path.join(
      __dirname,
      "../public/imgs/posts",
      post.image
    );
    res.download(imageFilePath, post.image);
  } else {
    res.status(404).json({ message: "Post non trovato" });
  }
}

// Funzione per l'eliminazione di un post
function destroy(req, res) {
  const slug = req.params.slug;
  const postIndex = posts.findIndex((post) => post.slug === slug);

  if (postIndex === -1) {
    res.status(404).json({ message: "Post non trovato" });
    return;
  }

  const deletedPost = posts.splice(postIndex, 1)[0];
  const json = JSON.stringify(posts);

  if (deletedPost.image) {
    const imagePath = path.resolve(
      __dirname,
      "../public/imgs/posts",
      deletedPost.image
    );
    fs.unlinkSync(imagePath);
  }

  fs.writeFileSync(path.resolve(__dirname, "../db.json"), json);

  if (req.accepts("html")) {
    // Redirect in caso di richiesta HTML
    res.redirect("/posts");
  } else {
    // Ritorna il testo di default in caso di richiesta diversa da HTML
    res.send("Post eliminato");
  }
}

// Funzione per la creazione di un nuovo post
function store(req, res) {
  const { title, content, image, tags } = req.body;

  // Crea lo slug a partire dal titolo
  const slug = title.toLowerCase().replace(/ /g, "-");

  // Crea l'oggetto post
  const newPost = {
    title,
    slug,
    content,
    image,
    tags,
  };

  // Aggiungi il post all'array
  posts.push(newPost);

  // Converte l'array di post in JSON
  const json = JSON.stringify(posts, null, 2);

  // Scrivi il JSON su file
  const filePath = path.resolve(__dirname, "../db.json");
  fs.writeFileSync(filePath, json);

  // Rispondi con HTML
  if (req.accepts("html")) {
    // Redirect in caso di richiesta HTML
    res.redirect(`/posts/${slug}`);
  } else if (req.accepts("json")) {
    res.json(newPost);
  } else {
    // Ritorna il testo di default in caso di richiesta diversa da HTML o JSON
    res.send("Post creato");
  }
}

module.exports = {
  index,
  show,
  download,
  destroy,
  store,
};
