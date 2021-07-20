const { addBukuHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBukuHandler
  }
]

module.exports = routes
