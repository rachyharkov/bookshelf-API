const { addBukuHandler, getAllBukuHandler, getBukuByIdHandler, updateBukuByIdHandler } = require('./handler')

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
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBukuByIdHandler
  }
]

module.exports = routes
