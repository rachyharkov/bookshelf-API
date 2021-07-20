const { addBukuHandler, getAllBukuHandler } = require('./handler')

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
  }
]

module.exports = routes
