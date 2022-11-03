import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axioserver from './services/axioserver'
import {
  useNavigate,
} from "react-router-dom"
import jsonData from'./services/sample.json'


function Success({fn, keyWords}) {
    const navigate = useNavigate()


// load local cookie when page load
useEffect(() => {
    
  }, [])

function logOut(){
    window.localStorage.removeItem('loggedChatAppUserToken')
    fn({"homeState": "init",
        "username": "",
        "jwt": "",
        "userId": "",})
    navigate('/')
}

//####################################

//####################################
    return (
        <div className="stagePage">
            <button onClick={logOut}> Success </button>

        </div>
        )
}

export default Success