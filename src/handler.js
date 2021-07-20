const { nanoid } = require('nanoid')
const books = require('./books')

const addBukuHandler = (request, h) => {
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid(10)
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBooq = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt
  }

  const isReadPageMoreThanPageCount = newBooq.readPage > newBooq.pageCount

  const isIdAvailable = newBooq.id === id

  const isNameNull = newBooq.name == null

  if (isIdAvailable) {
    if (isNameNull) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      response.code(400)
      return response
    }

    if (isReadPageMoreThanPageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
      })
      response.code(400)
      return response
    }

    books.push(newBooq)

  	const response = h.response({
  		status: 'success',
  		message: 'Buku berhasil ditambahkan',
  		data: {
  			bookId: id
  		}
  	})
  	response.code(201)
  	return response
  }

  const response = h.response({
  	status: 'fail',
  	message: 'Buku gagal ditambahkan'
  })

  response.code(500)
  return response
}

const getAllBukuHandler = () => ({
  status: 'success',
  data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))
  }
})

module.exports = { addBukuHandler, getAllBukuHandler }
