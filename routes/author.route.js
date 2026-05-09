const { Router } = require('express');
const controller = require('../controllers/author.controller.js');

const router = Router();

router.get('/', controller.getAllAuthors);
router.get('/:id', controller.getAuthorById);
router.get('/:id/books', controller.getAllBooksByAuthorId);

router.post('/', controller.createAuthor);

router.delete('/:id', controller.deleteAuthorById);

module.exports = router;