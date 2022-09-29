const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const models = require('../models')

/* Create a new session for a user */
const createSession = async (request, response) => {
    const hashPassword = await bcrypt.hash(request.body.password, 10)
    const session = new models.Session({
        username: request.body.username,
        password: hashPassword
    })
    try {
        const returned = await session.save()
            .catch((err) => {
                return response.json({status: "error username taken"})
            })

        if (returned && session._id) {
            const userForToken = {
                id: session._id,
                username: session.username          
            }
            let token = null
            token = jwt.sign(userForToken, 
                process.env.SESSION_DB_SECRET, 
                { expiresIn: 3600 }
                )
            return response.status(200).json({
                jwt: 'Bearer '+token,
                status: "success",
                username: session.username,
                token: session._id})
        } 
    } catch (error) {
    
    }
    response.json({status: "error build token"}) 
}


const getUser = async (request, response) => {
    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)
        try {
            // this will throw an error if token isn't of the right format
            const match = await models.Session.findById(token)
            if (match) {
                response.json({
                    status: "success",
                    username: match.username,
                    token: match._id
                })       
            }
        } catch { }
    }
    response.json({status: "error"})
}

// process post login
// receive { username: xxxx, password: xxxxx}
// respone {jwt, status, username, token}
const postLogin = async (request, response) => {
    try {
        const match = await models.Session.findOne({username: request.body.username})
        if (match) {
            if (await bcrypt.compare(request.body.password, match.password)) {
                const userForToken = {
                    id: match._id,
                    username: match.username          
                }
                let token = null
                try {
                    token = jwt.sign(userForToken, 
                        process.env.SESSION_DB_SECRET, 
                        { expiresIn: 3600 }
                        )
                } 
                catch (error) {
                    return response.json({status: "error invalid token"}) 
                }
                return response.status(200).json({
                            jwt: 'Bearer '+token,
                            status: "success",
                            username: match.username,
                            token: match._id})
            }
        }
    } catch { }
    response.json({status: "error username or password"})
}


/* 
 * no avaible any more
*/
const validUser1 = async (request) => {
    
    const authHeader = request.get('Authorization')
    if (authHeader && authHeader.toLowerCase().startsWith('basic ')) {
        const token = authHeader.substring(6)        
        const match = await models.Session.findOne({_id: token})  

        if (match) {
            return match._id
        }
    } 
    return false
}


const getTokenFrom = request => {
    const authorization = request.get('authorization') 
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
           return authorization.substring(7)  
        }  
    return null
}

/* 
 * validUser - check for a valid user via Authorization header
 *   return the username if found, false if not
*/
const validUser = async (request, response) => {
    const token = getTokenFrom(request)
    if (token) {
        try {
            const decoded=jwt.verify(token, process.env.SESSION_DB_SECRET)
            const match = await models.Session.findOne({username: decoded.username})
            if (match) {
                return match._id
            }
        }catch (error){
            response.json({status: "error invalid token", ...error})
        }
    }
    response.json({status: "error invalid token"})
    return "false"
}

module.exports = { validUser, getUser, createSession, postLogin }
