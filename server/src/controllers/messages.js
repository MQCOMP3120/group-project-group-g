const models = require('../models')
const auth = require('./auth')

const createMessage = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const text = request.body.text
    const cid = request.params.id
    // check that this is a valid conversation
    const conversation = await models.Conversation.findOne({_id: cid})
    if (conversation) {

        const message = new models.Message({creator: user, conversation: conversation._id, text})
        const returned = await message.save()

        if (returned) {
            return response.json({status: "success", id: returned._id, timestamp: returned.timestamp})
        }
    }
    return response.json({status: "error"})
}


const getMessages = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const messages = await models.Message.find({conversation: id})
            .populate('creator')
            .sort('timestamp')
    if (messages) {
        response.json({messages})
    } else {
        response.json({status: "error"})
    }
}

const getMessage = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const msgid = request.params.msgid
    const returned = await models.Message.findById(msgid).populate('creator')
    if (returned) {
        response.json(returned)
    } else {
        response.json({status: "error"})
    }
}

const deleteMessage = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const msgid = request.params.msgid
    const message = await models.Message.findOne({_id: msgid})

    if (message && (message.creator.toString() === user.toString())) {
        const result = await models.Message.deleteOne({_id: msgid})
        if (result.acknowledged) {
            return response.json({status: 'success'})
        }
    } 
    response.json({'status': 'error'})

}

const likeMessage = async (request, response) => {
    const user = await auth.validUser(request, response)
    if (user === "false")   return

    const msgid = request.params.msgid
    var returned = null
    if(request.body.like){
        returned = await models.Message.findByIdAndUpdate(msgid, {$inc:{like:1}}, 
            {new: true}).populate('creator')
    } else {
        returned = await models.Message.findByIdAndUpdate(msgid, {$inc:{dislike:1}}, 
            {new: true}).populate('creator') 
    }
    if (returned) {
        response.json(returned)
    } else {
        response.json({status: "error"})
    }
}


module.exports = {
    createMessage, 
    getMessages,
    getMessage, 
    deleteMessage,
    likeMessage
}