const { response } = require('express')
const db = require('../database/database')
const formatInfo = require('../helpers/formatInfo')

const getBooks = (req, res = response) => {
  db.query('SELECT id_book, book_name, isbn, id_author, author_name, country FROM books INNER JOIN authors on books.id_author = authors.id', (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        msg: 'Query error'
      })
    }

    if (result.length === 0) {
      return res.json({
        error: false,
        msg: 'There is no content in the database'
      })
    }

    const formatedInfo = formatInfo(result)

    return res.json({
      error: false,
      books: formatedInfo
    })
  })
}

const getBookByID = (req, res = response) => {
  const { id } = req.params

  db.query('SELECT id_book, book_name, isbn, id_author, author_name, country FROM books INNER JOIN authors on books.id_author = authors.id WHERE id_book = ?', id, (err, result) => {
    const formatedInfo = formatInfo(result)

    if (err) {
      res.status(500).json({
        error: true,
        msg: 'Query error'
      })
    }

    if (result.length === 0) {
      res.json({
        error: false,
        msg: `There is not book with the id ${id}`
      })
    }

    return res.json({
      error: false,
      books: formatedInfo
    })
  })
}

const createBook = (req, res = response) => {
  const { name, isbn, author } = req.body

  db.query('SELECT id, author_name FROM authors WHERE author_name = ?', author, (err, result) => {
    if (err) {
      return res.status(404).json({
        error: true,
        msg: err.sqlMessage
      })
    }

    if (result.length === 0) {
      return res.json({
        error: false,
        msg: `There is not authors with the name ${author}`
      })
    }

    const newBook = {
      book_name: name,
      isbn,
      id_author: result[0].id
    }

    db.query('INSERT INTO books SET ?', newBook, (err) => {
      if (err) {
        return res.status(409).json({
          error: true,
          msg: err.sqlMessage
        })
      }

      return res.status(201).json({
        error: false,
        msg: 'Book created'
      })
    })
  })
}

const editBook = (req, res = response) => {
  const { id } = req.params
  const { name, isbn, author } = req.body

  db.query('SELECT id, author_name FROM authors WHERE author_name = ?', author, (err, result) => {
    if (err) {
      return res.status(404).json({
        error: true,
        msg: err.sqlMessage
      })
    }

    if (result.length === 0) {
      return res.json({
        error: false,
        msg: `There is not Authors with the name ${author}`
      })
    }

    const updatedBook = {
      book_name: name,
      isbn,
      id_author: result[0].id
    }

    db.query('UPDATE books SET ? WHERE id_book = ?', [updatedBook, id], (err, result) => {
      if (err) {
        return res.status(409).json({
          error: true,
          msg: err.sqlMessage
        })
      }

      if (result.affectedRows === 0) {
        res.json({
          error: false,
          msg: `There is not a book with the id ${id}`
        })
      }
    })

    return res.status(201).json({
      error: false,
      msg: 'Book upadted'
    })
  })
}

const deleteBook = (req, res = response) => {
  const { id } = req.params

  db.query('DELETE FROM books WHERE id_book = ?', id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        msg: 'There was an error deleting the book'
      })
    }

    if (result.affectedRows === 0) {
      return res.status(204).json({
        error: true,
        msg: `There is not a book with the id ${id}`
      })
    }

    return res.json({
      error: false,
      msg: 'The book has been deleted'
    })
  })
}

module.exports = { getBooks, getBookByID, createBook, editBook, deleteBook }
