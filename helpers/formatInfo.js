const formatInfo = (result) => {
  const info = result.map((data) => {
    const mappedInfo = {
      id: data.id_book,
      bookName: data.book_name,
      ISBN: data.isbn,
      author: {
        id: data.id_author,
        name: data.author_name,
        country: data.country
      }
    }

    return mappedInfo
  })

  return info
}

module.exports = formatInfo
