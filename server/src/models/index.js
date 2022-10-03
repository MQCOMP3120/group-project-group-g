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
    price: {type: String, default: "0"},
    brandId: {type: mongoose.Types.ObjectId, ref: 'Brand'},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
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

// productSchema.options.toObject = productSchema.options.toJSON = {
//   transform: function(doc, ret, options) {
//     ret.id = ret._id.toString()
//     if (ret.brandId) {
//       ret.brandId = ret.brand._id.toString()
//       ret.brand = ret.brand.title
//     }
//     delete ret._id
//     delete ret.__v
//     return ret;
//   }
// }

const Product = mongoose.model('Product', productSchema)

//###########################################################
const initDB = async () => {
    await mongoose
        .connect(config.mongoDBUrl)
        .catch((error) => {    
            console.log('error connecting to MongoDB:', error.message)  
        })
    }

module.exports = { Users, Brand, Product, initDB }
