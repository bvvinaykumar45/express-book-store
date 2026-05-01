const express = require('express');

const app = express();
const PORT = 8000;

// In memory DB
const books = [
  { id: 1, title: 'Title One', author: 'Author One' },
  { id: 1, title: 'Title Two', author: 'Author Two' },  
];

// Middlewares (Plugins)
app.use(express.json());

// Routes
app.get('/books', (req, res) => {
  return res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({ error: `id must be of type number` });

  const book = books.find(book => book.id === id); // SELECT * FROM books WHERE id = :id

  if(!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  return res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  if(!title || title === '')
    return res.status(400).json({ error: 'title is required' });
  
  if(!author || author === '')
    return res.status(400).json({ error: 'author is required' });

  const id = books.length + 1;

  const book = {
    id,
    title,
    author
  };

  books.push(book);

  return res.status(201).json({ message: 'Book created success', id });
});

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));