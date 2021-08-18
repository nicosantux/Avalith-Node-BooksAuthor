const router = require('express').Router()
const { check } = require('express-validator')

const { fieldValidator } = require('../middlewares/fieldvalidator')
const { getAuthors, getAuthorByID, createAuthor, editAuthor } = require('../controllers/author')

router.get('/authors', getAuthors)

router.get('/authors/:id', [check('id', 'ID must be a number').isNumeric(), fieldValidator], getAuthorByID)

router.post(
  '/authors',
  [
    check('author_name', 'Author name is required').not().isEmpty(),
    check('author_name', 'The author name cannot be more than 30 characters').isLength({ max: 30 }),
    check('country', 'Country is required').not().isEmpty(),
    check('country', 'The country cannot be more than 30 characters').isLength({ max: 30 }),
    fieldValidator
  ],
  createAuthor)

router.put(
  '/authors/:id',
  [
    check('id', 'ID must be a number').isNumeric(),
    check('author_name', 'Author name is required').not().isEmpty(),
    check('author_name', 'The author name cannot be more than 30 characters').isLength({ max: 30 }),
    check('country', 'Country is required').not().isEmpty(),
    check('country', 'The country cannot be more than 30 characters').isLength({ max: 30 }),
    fieldValidator
  ],
  editAuthor)

module.exports = router
