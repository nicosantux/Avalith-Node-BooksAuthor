const router = require('express').Router()
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/fieldvalidator')
const { getBooks, getBookByID, createBook, editBook, deleteBook } = require('../controllers/book')

router.get('/books', getBooks)

router.get('/books/:id', [check('id', 'ID must be a number').isNumeric(), fieldValidator], getBookByID)

router.post(
  '/books',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'The name cannot be more than 50 characters').isLength({ max: 50 }),
    check('isbn', 'ISBN is required').not().isEmpty(),
    check('isbn', 'The ISBN cannot be more than 17 characters').isLength({ max: 17 }),
    check('author', 'Author is required').not().isEmpty(),
    check('author', 'The author cannot be more than 30 characters').isLength({ max: 30 }),
    fieldValidator
  ],
  createBook)

router.put(
  '/books/:id',
  [
    check('id', 'ID must be a number').isNumeric(),
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'The name cannot be more than 50 characters').isLength({ max: 50 }),
    check('isbn', 'ISBN is required').not().isEmpty(),
    check('isbn', 'The ISBN cannot be more than 17 characters').isLength({ max: 17 }),
    check('author', 'Author is required').not().isEmpty(),
    check('author', 'The author cannot be more than 30 characters').isLength({ max: 30 }),
    fieldValidator
  ],
  editBook)

router.delete('/books/:id', [check('id', 'ID must be a number').isNumeric(), fieldValidator], deleteBook)

module.exports = router
