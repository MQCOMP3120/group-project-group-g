const express = require('express')
const auth = require('./controllers/auth')
const brands = require('./controllers/brands')
const products = require('./controllers/products')
const carts = require('./controllers/carts')

const router = express.Router()
 
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

router.post('/auth/register', auth.registerUser)
router.post('/auth/login', auth.postLogin)
router.get('/api/users', auth.getUsers)
router.get('/api/users/:id', auth.getUser)
router.put('/api/users/:id', auth.modUser)


/* GET conversations returns a list of all current conservations */
router.get('/api/brands', brands.getBrands)

/* POST to conversations creates a new conversation */
router.post('/api/brands', brands.createBrand)

// /* GET a conversation returns the list of the last N conversations */
router.get('/api/brands/:id', brands.getBrand)
router.delete('/api/brands', brands.deleteBrands)


// /* GET a message URL to get details of a message */
router.get('/api/products', products.getProducts)
router.get('/api/products/:id', products.getProduct)
router.put('/api/products/:id', products.modProduct)
// /* POST to a conversation to create a new message */
router.post('/api/products', products.createProduct)
// /* DELETE to message URL to delete the message */
router.delete('/api/products', products.deleteProducts)
router.delete('/api/products/:id', products.deleteProduct)

router.post('/api/wishlists', products.createWishList)
router.get('/api/wishlists', products.getWishList)
router.delete('/api/wishlists', products.deleteWishLists)
router.delete('/api/wishlists/:id', products.deleteWishList)

router.post('/api/carts', carts.createCart)
router.get('/api/carts', carts.getCarts)
router.get('/api/carts/:id', carts.getCart)
router.get('/api/cartsuser', carts.getUserCarts)
router.put('/api/carts/:id', carts.modCart)
router.delete('/api/carts', carts.deleteCarts)
router.delete('/api/carts/:id', carts.deleteCart)
router.patch('/api/carts/:id', carts.payCart)
module.exports = router 