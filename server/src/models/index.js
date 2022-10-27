const mongoose = require('mongoose')
const config = require('../config')


//###########################################################
const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String, default: ""},
    email: {type: String, default: ""},
    address: {type: String, default: ""},
    phone: {type: String, default: ""},
  })

userSchema.options.toObject = userSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret;
  }
}

const Users = mongoose.model('Users', userSchema)

//###########################################################

const brandSchema = new mongoose.Schema({
    title: {type: String, unique: true},
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  })

brandSchema.virtual('products',{
    ref: 'Product', // The model to use
    localField: '_id', // Find messages where `localField`
    foreignField: 'brandId', // is equal to `foreignField`
    count: true // And only get the number of docs
  });

// brandSchema.options.toObject = brandSchema.options.toJSON = {
//   transform: function(doc, ret, options) {
//     ret.id = ret._id.toString()
//     delete ret._id
//     delete ret.__v
//     return ret;
//   }
// }

brandSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  delete cObj._id
  delete cObj.__v
  return cObj
}

const Brand = mongoose.model('Brand', brandSchema)

//###########################################################

const productSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    price: {type: Number, default: 0},
    brandId: {type: mongoose.Types.ObjectId, ref: 'Brand'},
    rating: {type: Number, default: 0},
    resolution: {type: String, default: ""},
    refreshrate: {type: String, default: ""},
    processor: {type: String, default: ""},
    gpu: {type: String, default: ""},
    ram: {type: String, default: ""},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
    image2: {type: String, default: ""},
    image3: {type: String, default: ""},
    timestamp: {type: Date, default: Date.now},
  })

  productSchema.methods.toJSON = function () {
    const cObj = this.toObject()
    cObj.id = cObj._id.toString()
    if (cObj.brandId) {
      cObj.brand = cObj.brandId.title
      cObj.brandId = cObj.brandId._id.toString()
    }
    delete cObj._id
    delete cObj.__v
    return cObj
  }

const Product = mongoose.model('Product', productSchema)

//###########################################################

const cartSchema = new mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
  timestamp: {type: Date, default: Date.now},
  paid: {type: Boolean, default: false},
})

cartSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  delete cObj._id
  delete cObj.__v
  return cObj
}

const Cart = mongoose.model('Cart', cartSchema)

const cartQSchema = new mongoose.Schema({
  cartId: {type: mongoose.Types.ObjectId, ref: 'Cart'},
  productId: {type: mongoose.Types.ObjectId, ref: 'Product'},
  quantity: {type: Number, default: 0},
})

cartQSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  if (cObj.productId) {
    cObj.productId = cObj.productId._id.toString()
  }
  delete cObj.cartId
  delete cObj._id
  delete cObj.__v
  return cObj
}
const CartQ = mongoose.model('CartQ', cartQSchema)

//###########################################################

const historycartSchema = new mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'Users'},
  timestamp: {type: Date, default: Date.now},
  paid: {type: Boolean, default: true},
  subtotal: {type: Number, default: 0},
})

historycartSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  delete cObj._id
  delete cObj.__v
  return cObj
}

const HistoryCart = mongoose.model('HistoryCart', historycartSchema)

const historycartQSchema = new mongoose.Schema({
  cartId: {type: mongoose.Types.ObjectId, ref: 'HistoryCart'},
  productId: {type: mongoose.Types.ObjectId, ref: 'Product'},
  quantity: {type: Number, default: 0},
})

historycartQSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  if (cObj.productId) {
    cObj.productId = cObj.productId._id.toString()
  }
  delete cObj.cartId
  delete cObj._id
  delete cObj.__v
  return cObj
}
const HistoryCartQ = mongoose.model('HistoryCartQ', historycartQSchema)

//###########################################################
const wishListSchema = new mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'Users', index: true},
  productId: {type: mongoose.Types.ObjectId, ref: 'Product', index: true},
})
wishListSchema.index({ userId: 1, productId: 1 }, { unique: true })

wishListSchema.methods.toJSON = function () {
  const cObj = this.toObject()
  cObj.id = cObj._id.toString()
  delete cObj._id
  delete cObj.__v
  return cObj
}
const WishList = mongoose.model('WishList', wishListSchema)


//###########################################################
const initDB = async () => {
    await mongoose
        .connect(config.mongoDBUrl)
        .catch((error) => {    
            console.log('error connecting to MongoDB:', error.message)  
        })
    }

module.exports = {
  Users, Brand, Product, 
  Cart, CartQ, 
  HistoryCart, HistoryCartQ, 
  WishList,
  initDB }
