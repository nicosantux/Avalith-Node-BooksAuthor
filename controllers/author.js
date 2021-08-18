const { response } = require('express')
const db = require('../database/database')

const getAuthors = (req, res = response) => {
  db.query('SELECT id, author_name, country FROM authors', (err, result) => {
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

    return res.json({
      error: false,
      result
    })
  })
}

const getAuthorByID = (req, res = response) => {
  const { id } = req.params

  db.query('SELECT id, author_name, country FROM authors WHERE id = ?', id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        msg: 'Query Error'
      })
    }

    if (result.length === 0) {
      return res.json({
        error: false,
        msg: `There is not author with the id ${id}`
      })
    }

    return res.json({
      error: false,
      result
    })
  })
}

const createAuthor = (req, res = response) => {
  const newAuthor = req.body

  db.query('INSERT INTO authors SET ?', newAuthor, (err) => {
    if (err) {
      return res.status(409).json({
        error: true,
        msg: err.sqlMessage
      })
    }
  })

  return res.json({
    error: false,
    msg: 'Author created'
  })
}

const editAuthor = (req, res = response) => {
  const { id } = req.params
  const upadtedAuthor = req.body

  db.query('UPDATE authors SET ? WHERE id = ?', [upadtedAuthor, id], (err, result) => {
    if (err) {
      return res.status(409).json({
        error: true,
        msg: err.sqlMessage
      })
    }

    if (result.affectedRows === 0) {
      return res.json({
        error: false,
        msg: `There is not author with the id ${id}`
      })
    }

    return res.json({
      error: false,
      msg: 'Author updated'
    })
  })
}

module.exports = {
  getAuthors,
  getAuthorByID,
  createAuthor,
  editAuthor
}
