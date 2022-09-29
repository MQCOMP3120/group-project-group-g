const auth = require('./auth')
const models = require('../models')


const createConversation = async (request, response) => {
    const creator = await auth.validUser(request, response)
    if (creator === "false")   return 

    const title = request.body.title
    const conversation = new models.Conversation({creator, title})
    const returned = await conversation.save()

    if (returned) {
        response.json({status: "success", id: conversation._id, messages: 0})
    } else {
        response.json({status: "error"})
    }
}


const getConversations = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return 

    const conversations = await models.Conversation.find({}).populate('messages')
    if (conversations) {
        response.json({conversations})
    } else {
        response.json({status: "error"})
    }
}

module.exports = { 
    createConversation, 
    getConversations
}