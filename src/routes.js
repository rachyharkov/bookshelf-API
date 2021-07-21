const { addBukuHandler, getAllBukuHandler, getBukuByIdHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBukuHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBukuHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBukuByIdHandler
  }
]

module.exports = routes
