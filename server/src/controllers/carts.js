const auth = require('./auth')
const models = require('../models')

const createCart = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const match = await models.Cart.find({userId: user._id, paid:false})
    if(match && match.length>0) return response.status(401).json({error: "invalid"})

    const cart = new models.Cart({userId: user._id, paid:false})
    const cartReturn = await cart.save()
    if(!cartReturn) return response.status(401).json({error: "invalid"})
    if(request.body.products && request.body.products.length>0){
        for (item of request.body.products){
            const product = await models.Product.findById(item.productId)
            if(product){
                const cartQ = new models.CartQ({
                    cartId: cartReturn._id,
                    productId: product._id,
                    quantity: item.quantity,
                })
                const returned = await cartQ.save()
                if(!returned) return response.status(401).json({error: "invalid"})
            }
        }
    }
    response.status(200).json({
        id: cartReturn._id,
        userId: request.body.userId,
        timestamp: cartReturn.timestamp,
        paid: false,
        products: request.body.products,
    })
}

const getCarts = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return 

    const match = await models.Cart.find({})
    if(match && match.length>0) {
        let result=[]
        for (item of match){
            const cartQ = await models.CartQ.find({cartId:item._id})
            let products = []
            for(temp of cartQ){
                products = products.concat({productId: temp.productId, quantity: temp.quantity})
            }
            result = result.concat({
                id: item._id,
                userId: item.userId,
                timestamp: item.timestamp,
                paid: item.paid,
                products: products,
            })
        }
        return response.status(200).json(result)
    }
    response.status(401).json({error: "invalid"})
}

const getCart = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return 

    const id = request.params.id
    const match = await models.Cart.findById(id)
    if (match) {
        const cartQ = await models.CartQ.find({cartId:match._id})
        let products = []
        for(temp of cartQ){
            products = products.concat({productId: temp.productId, quantity: temp.quantity})
        }
        const result = {
            id: match._id,
            userId: match.userId,
            timestamp: match.timestamp,
            paid: match.paid,
            products: products,
        }
        return response.status(200).json(result)
    }
    response.status(401).json({error: "invalid"})
}

const getUserCarts = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return 

    const match = await models.Cart.find({userId: user._id})
    if(match && match.length>0) {
        let result=[]
        for (item of match){
            const cartQ = await models.CartQ.find({cartId:item._id})
            let products = []
            for(temp of cartQ){
                products = products.concat({productId: temp.productId, quantity: temp.quantity})
            }
            result = result.concat({
                id: item._id,
                userId: item.userId,
                timestamp: item.timestamp,
                paid: item.paid,
                products: products,
            })
        }
        return response.status(200).json(result)
    }
    response.status(401).json({error: "invalid"})
}

const modCart = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const cart = {userId: user._id, paid:request.body.paid}
    const cartReturn = await models.Cart.findByIdAndUpdate(id, cart,{new: true})
    if(!cartReturn) return response.status(401).json({error: "invalid"})
    await models.CartQ.deleteMany({cartId: cartReturn._id})

    if(request.body.products && request.body.products.length>0){
        for (item of request.body.products){
            const product = await models.Product.findById(item.productId)
            if(product){
                const cartQ = new models.CartQ({
                    cartId: cartReturn._id,
                    productId: product._id,
                    quantity: item.quantity,
                })
                const returned = await cartQ.save()
                if(!returned) return response.status(401).json({error: "invalid"})
            }
        }
    }
    response.status(200).json({
        id: cartReturn._id,
        userId: request.body.userId,
        timestamp: cartReturn.timestamp,
        paid: request.body.paid,
        products: request.body.products,
    })
}

const deleteCart = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const cartReturn = await models.Cart.deleteOne({_id: id})
    if(!cartReturn.acknowledged) return response.status(401).json({error: "invalid"})

    await models.CartQ.deleteMany({cartId: id})

    response.status(200).json({status: "OK"})
}

const payCart = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const cart = {userId: user._id, paid:request.body.paid}
    const cartReturn = await models.Cart.findByIdAndUpdate(id, cart,{new: true})
    if(!cartReturn) return response.status(401).json({error: "invalid"})
    response.status(200).json({status: "OK"})
}

const deleteCarts = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return
    await models.CartQ.deleteMany({})
    await models.Cart.deleteMany({})
    response.status(200).json({status: "OK"})
}

module.exports = { 
    createCart,
    getCarts,
    getCart,
    getUserCarts,
    modCart,
    deleteCart,
    deleteCarts,
    payCart,
}