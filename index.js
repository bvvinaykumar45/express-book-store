const express = require('express');

const app = express();
const PORT = 8000;

// In memory DB
const books = [
  {id: 1, title: 'Title One', author: 'Author One'},
  {id: 1, title: 'Title Two', author: 'Author Two'},  
];

// Routes
app.get('/books', (req, res) => {
  res.json(books);
});

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));