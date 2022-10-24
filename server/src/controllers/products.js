const models = require('../models')
const auth = require('./auth')

const getProducts = async (request, response) => {
    // const user = await auth.validUser(request, response)
    // if (user === "false")   return 

    const match = await models.Product.find({}).populate('brandId')
    if(match && match.length>0) {
        response.status(200).json(match)
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const getProduct = async (request, response) => {
    // const user = await auth.validUser(request, response)
    // if (user === "false")   return 

    const id = request.params.id
    const match = await models.Product.findById(id).populate('brandId')
    if (match) {
        response.status(200).json(match)
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const deleteProduct = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const match = await models.Product.deleteOne({_id: id})

    if (match.acknowledged) {
        response.status(200).json({status: "OK"})
    } else {
        response.status(200).json({error: "invalid"})
    }

}

const createProduct = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    if(request.body.brandId){
        const brand = await models.Brand.findById(request.body.brandId)
        if(brand){
            const product = new models.Product({
                title: request.body.title,
                price: request.body.price,
                brandId: brand._id,
                rating: request.body.rating,
                resolution: request.body.resolution,
                refreshrate: request.body.refreshrate,
                processor: request.body.processor,
                gpu: request.body.gpu,
                ram: request.body.ram,
                description: request.body.description,
                image: request.body.image,
                image2: request.body.image2,
                image3: request.body.image3,
            })
            const returned = await product.save()
            if (returned) {
                return response.status(200).json({
                    title: request.body.title,
                    price: request.body.price,
                    brandId: brand._id,
                    brand: brand.title,
                    rating: request.body.rating,
                    resolution: request.body.resolution,
                    refreshrate: request.body.refreshrate,
                    processor: request.body.processor,
                    gpu: request.body.gpu,
                    ram: request.body.ram,
                    description: request.body.description,
                    image: request.body.image,
                    image2: request.body.image2,
                    image3: request.body.image3,
                })
            }
        }
    }
    response.status(200).json({error: "invalid"})
}


const modProduct = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    if(request.body.brandId){
        const brand = await models.Brand.findById(request.body.brandId)
        if(brand){
            const product = {
                title: request.body.title,
                price: request.body.price,
                brandId: brand._id,
                rating: request.body.rating,
                resolution: request.body.resolution,
                refreshrate: request.body.refreshrate,
                processor: request.body.processor,
                gpu: request.body.gpu,
                ram: request.body.ram,
                description: request.body.description,
                image: request.body.image,
                image2: request.body.image2,
                image3: request.body.image3,
            }
            const id = request.params.id
            //console.log("id:", id);
            //console.log("product", product);
            var returned = await models.Product.findByIdAndUpdate(id, product,{new: true})
            if (returned) {
                return response.status(200).json({
                    title: request.body.title,
                    price: request.body.price,
                    brandId: brand._id,
                    brand: brand.title,
                    rating: request.body.rating,
                    resolution: request.body.resolution,
                    refreshrate: request.body.refreshrate,
                    processor: request.body.processor,
                    gpu: request.body.gpu,
                    ram: request.body.ram,
                    description: request.body.description,
                    image: request.body.image,
                    image2: request.body.image2,
                    image3: request.body.image3,
                })
            }
        }
    }
    response.status(200).json({error: "invalid"})
}

const createWishList = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const product = new models.WishList({
        userId: user._id,
        productId: request.body.productId,
    })
    const returned = await product.save()
    if (returned) {
        return response.status(200).json({
            productId: request.body.productId,
        })
    }
    response.status(200).json({error: "invalid"})
}

const getWishList = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const match = await models.WishList.find({userId: user._id})
    if(match && match.length>0) {
        let products = []
        for(temp of match){
            products = products.concat({productId: temp.productId})
        }
        return response.status(200).json(products)
    }
    response.status(200).json({error: "invalid"})                                    


}

const deleteWishList = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const match = await models.WishList.deleteMany({userId: user._id,
                                                productId: id,
                                            })
    console.log("del wish list:", match);
    if (match.deletedCount && match.deletedCount != 0) {
        response.status(200).json({status: "OK"})
    } else {
        response.status(200).json({error: "invalid"})
    }
}

const deleteWishLists = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return
    await models.WishList.deleteMany({})
    response.status(200).json({status: "OK"})
}

const deleteProducts = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return
    await models.Product.deleteMany({})
    response.status(200).json({status: "OK"})
}

module.exports = {
    getProducts, 
    getProduct,
    createProduct,
    deleteProduct, 
    modProduct,
    createWishList,
    getWishList,
    deleteWishList,
    deleteWishLists,
    deleteProducts,
}
