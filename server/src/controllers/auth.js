const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const models = require('../models/index.js')

/* Create a new session for a user */
const registerUser = async (request, response) => {
    const hashPassword = await bcrypt.hash(request.body.password, 10)
    const user = new models.Users({
        username: request.body.username,
        password: hashPassword,
        email: request.body.email,
        address: request.body.address,
        phone: request.body.phone,
    })
    try {
        const returned = await user.save()
            .catch((err) => {
                response.status(401).json({error: "invalid"})
            })
        if (returned && user._id) {
            const userForToken = {
                id: user._id,
                username: user.username
            }
            let token = null
            token = jwt.sign(userForToken, 
                process.env.SESSION_DB_SECRET, 
                //{ expiresIn: 3600 }
                )
            return response.status(200).json({
                jwt: 'Bearer '+token,
                username: user.username,
                userId: user._id})
        } 
    } catch (error) {
    
    }
    response.status(401).json({error: "invalid"})
}

// process post login
// receive { username: xxxx, password: xxxxx}
// respone {jwt, status, username, token}
const postLogin = async (request, response) => {
    try {
        const match = await models.Users.findOne({username: request.body.username})
        if (match) {
            if (await bcrypt.compare(request.body.password, match.password)) {
                const userForToken = {
                    id: match.id,
                    username: match.username          
                }
                let token = null
                try {
                    token = jwt.sign(userForToken, 
                        process.env.SESSION_DB_SECRET, 
                        //{ expiresIn: 3600 }
                        )
                } 
                catch (error) {
                    return response.status(401).json({error: "invalid"})
                }
                return response.status(200).json({
                            jwt: 'Bearer '+token,
                            username: match.username,
                            userId: match.id,
                            email: match.email,
                            address: match.address,
                            phone: match.phone,
                        })
            }
        }
    } catch { }
    response.status(401).json({error: "invalid"})
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
            const match = await models.Users.findOne({username: decoded.username})
            if (match) {
                return match._id
            }
        }catch (error){
            response.status(401).json({error: "error invalid token", ...error})
        }
    }
    response.status(401).json({error: "error invalid token"})
    return "false"
}


const getUsers = async (request, response) => {
    const user = await validUser(request, response)
    if (user === "false")   return

    const match = await models.Users.find({})
    if (match) {
        response.status(200).json(match)
    } else {
        response.status(401).json({error: "invalid"})
    }
}


const getUser = async (request, response) => {
    const user = await validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const match = await models.Users.findById(id)
    if (match) {
        response.status(200).json({
            username: match.username,
            userId: match.id,
            email: match.email,
            address: match.address,
            phone: match.phone,
        })
    } else {
        response.status(401).json({error: "invalid"})
    }
}

const modUser = async (request, response) => {
    const user = await validUser(request, response)
    if (user === "false")   return

    const id = request.params.id
    const hashPassword = await bcrypt.hash(request.body.password, 10)
    const newProfile = {...request.body, password: hashPassword}
    var match = await models.Users.findByIdAndUpdate(id, newProfile, {
        new: true
      })
    if (match) {
        const userForToken = {
            id: user._id,
            username: user.username
        }
        let token = null
        token = jwt.sign(userForToken, 
            process.env.SESSION_DB_SECRET, 
            //{ expiresIn: 3600 }
            )
        return response.status(200).json({
            jwt: 'Bearer '+token,
            username: user.username,
            userId: user._id})
    }

    response.status(401).json({error: "invalid"})
}

module.exports = { validUser, registerUser, postLogin, getUser ,
getUsers, modUser }
