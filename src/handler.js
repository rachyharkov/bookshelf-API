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

const getAllBukuHandler = (request, h) => {  
  
  const { name, reading, finished } = request.query

  if (name || reading || finished) {
    
    let booksWithSpecifiedNameAvailable

    if (name) {
      //experiment with indexOf x filter
      booksWithSpecifiedNameAvailable = books.filter(b => b.name.toLowerCase().indexOf(name.toLowerCase()) >= 0)

      if (booksWithSpecifiedNameAvailable.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: booksWithSpecifiedNameAvailable.map((book) => (
            {
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }
          ))
          }
        })
        response.code(200)
        return response  
      }
    }

    if (reading) {
      
      const isReading = reading == 1

      const booksWithSpecifiedReadingStatusAvailable = books.filter(b =>
    b.reading === isReading)

      if (booksWithSpecifiedReadingStatusAvailable.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: booksWithSpecifiedReadingStatusAvailable.map((book) => (
            {
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
          }
        })
        response.code(200)
        return response
      }
    }

    if (finished) {
      
      const isfinished = finished == 1

      const booksWithSpecifiedFinishStatusAvailable = books.filter(b =>
    b.finished === isfinished)

      if (booksWithSpecifiedFinishStatusAvailable.length > 0) {
        const response = h.response({
          status: 'success',
          data: {
            books: booksWithSpecifiedFinishStatusAvailable.map((book) => (
            {
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
          }
        })
        response.code(200)
        return response
      }
    }

    if (!booksWithSpecifiedNameAvailable || !booksWithSpecifiedFinishStatusAvailable || !booksWithSpecifiedReadingStatusAvailable) {
      const response = h.response({
        status: 'success',
        message: 'Buku yang dicari tidak ada berdasarkan filter yang diberikan'
      })
      response.code(200)
      return response
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => (
        {
          id: book.id,
          name: book.name,
          publisher: book.publisher
        }
      ))
    }
  })
  response.code(200)
  return response
}

const getBukuByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = books.filter((n) => n.id === bookId)[0]

  if (book ===  undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
  }

  const response = h.response({
    status: 'success',
      data: {
        book: book
      }
  })
  response.code(200)
  return response
}

const updateBukuByIdHandler = (request, h) => {
  const { bookId } = request.params

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
  
  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === bookId)

  const isNameNull = name == null

  const isReadPageMoreThanPageCount = readPage > pageCount

  if (isNameNull) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (isReadPageMoreThanPageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt
  }

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui'
  })
  response.code(200)
  return response
}

const deleteBukuByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = books.findIndex((note) => note.id === bookId)

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
  }

  books.splice(index, 1)
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus'
  })
  response.code(200)
  return response
}

const getAllBukuWithFilterSearchEror = (request, h) => {

}

module.exports = { addBukuHandler, getAllBukuHandler , getBukuByIdHandler, updateBukuByIdHandler, deleteBukuByIdHandler}
