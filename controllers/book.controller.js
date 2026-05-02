
const { books } = require('../models/book.js');

exports.getAllBooks = function (req, res) {
  return res.json(books);
}

exports.getBookById = function (req, res) {
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({ error: `id must be of type number` });

  const book = books.find(book => book.id === id); // SELECT * FROM books WHERE id = :id

  if(!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  return res.json(book);
}

exports.createBook = function (req, res) {
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
}

exports.deleteBookById = function (req, res) {
  const id = parseInt(req.params.id);

  if(isNaN(id))
    return res.status(400).json({ error: `id must be of type number` });

  const indexToDelete = books.findIndex(book => book.id === id);

  if(indexToDelete < 0) 
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  books.splice(indexToDelete, 1);

  return res.status(200).json({ message: 'book deleted'});
}
