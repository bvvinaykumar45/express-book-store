const express = require('express');

const controller = require('../controllers/book.controller.js');

const router = express.Router();

router.get('/', controller.getAllBooks);
router.get('/:id', controller.getBookById);

router.post('/', controller.createBook);

router.delete('/:id', controller.deleteBookById);

module.exports = router;