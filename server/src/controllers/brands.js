const auth = require('./auth')
const models = require('../models')


const getBrands = async (request, response) => {
    // const user = await auth.validUser(request, response)
    // if (user === "false")   return 

    const match = await models.Brand.find({}).populate('products')
    if(match && match.length>0) {
        response.status(200).json(match)
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const createBrand = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return 

    const title = request.body.title
    const brand = new models.Brand({title})
    const returned = await brand.save()

    if (returned) {
        response.status(200).json({
            title: returned.title,
            id: returned._id})
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const getBrand = async (request, response) => {
    // const user = await auth.validUser(request, response)
    // if (user === "false")   return

    const id = request.params.id
    const match = await models.Product.find({brandId: id})
            .populate('brandId')
            .sort('timestamp')
    if(match && match.length>0) {
        response.status(200).json(match)
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const deleteBrands = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return
    
    await models.Brand.deleteMany({})
    response.status(200).json({status: "OK"})
}


module.exports = { 
    getBrands, 
    createBrand,
    getBrand,
    deleteBrands,
}