import { useState, useEffect } from 'react'
import axioserver from './services/axioserver'
import logo from './logo.png'

import {
  useNavigate,
} from "react-router-dom"

function Home({fn, keyWords}) {
    // values for login and register form
    const [user, setUser] = useState({
            "username": "",
            "password": "",
            "email": "",
            "address": "",
            "phone": "",
            "userId": "",
        })
    const navigate = useNavigate()

//####################################
// load local cookie when page load
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedChatAppUserToken')
        if (loggedUserJSON) {
          let user = JSON.parse(loggedUserJSON)
          fn(user)
        }
      }, [])
// update cookie when values are changed    
    useEffect(() => {
        if(keyWords.username){
        window.localStorage.setItem(
            'loggedChatAppUserToken', JSON.stringify(keyWords)
          )
        }
    }, [keyWords])

//####################################
    // network command for login with username and password
    function httpGetAuth(){
        console.log("httpGetAuth key: ", user)
        if(user.password ==="" || user.username ==="") return
        axioserver.getAuth(user)
        .then(response =>
            {console.log("httpGetAuth res:\n", response)
            if(!response.error){
                fn({...keyWords, 
                    homeState: "logined",
                    username: response.username, 
                    jwt: response.jwt,
                    userId: response.userId,})
            } else {alert(response.error)}
        })
        .catch( (error) =>
            alert(`httpGetAuth respond:${error}`)
        )
    }
    // network command for register with username and password
    function httpPostReg(){
        console.log("httpPostReg key: ", user)
        if(user.password ==="" || user.username ==="") return
        axioserver.postReg(user)
        .then(response =>
            {console.log("httpPostReg res:\n", response)
            if(!response.error){
                fn({...keyWords, 
                    homeState: "registered",
                    username: response.username, 
                    jwt: response.jwt,
                    userId: response.userId,})
                } else {alert(response.error)}
        })
        .catch( (error) =>
            alert(`httpPostReg respond:${error}`)
        )
    }
//####################################
    // button components
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUser(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        httpGetAuth()
    }
      
    const handleSubmitReg = (event) => {
        event.preventDefault()
        httpPostReg()
    }
    
    function cancel(){
        fn({...keyWords, 
            homeState: "init"})
        setUser({
            "username": "",
            "password": "",
        })
    }
    // navigate to conversation page
    const toStage = (event) => {
        event.preventDefault()
        navigate('/Stage')
    }
    // logout button
    function logOut(){
        window.localStorage.removeItem('loggedChatAppUserToken')
        fn({"homeState": "init",
            "username": "",
            "jwt": "",
            "userId": "",})
        navigate('/')
    }

//####################################

    switch (keyWords.homeState){
        case 'login':
            return (
                <div className="homePage">
                    <img src={logo} alt="chat icon" width="256" height="256"></img>
                    <form onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange}/>
                        <label>Password:</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange}/>
                        <p></p>
                        <button type="submit"> Login </button>
                        &emsp;
                        <button onClick={cancel}> Cancel </button>
                    </form>
                </div>
            )
        case 'register':
            return (
                <div className="homePage">
                    <img src={logo} alt="chat icon" width="256" height="256"></img>
                    <form onSubmit={handleSubmitReg}>
                        <label>Username:</label>
                        <input type="text" name="username" value={user.username} onChange={handleChange}/>
                        <label>Password:</label>
                        <input type="password" name="password" value={user.password} onChange={handleChange}/>
                        <label>Email:</label>
                        <input type="text" name="email" value={user.email} onChange={handleChange}/>
                        <label>Address:</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange}/>
                        <label>Phone:</label>
                        <input type="text" name="phone" value={user.phone} onChange={handleChange}/>
                        <p></p>
                        <button type="submit"> Register </button>
                        &emsp;
                        <button onClick={cancel}> Cancel </button>
                    </form>
                </div>
            )
        case 'logined':
            return (
                <div className="homePage">
                    <img src={logo} alt="chat icon" width="256" height="256"></img>
                    <p>Weclome <strong>{keyWords.username}</strong>.</p>
                    <p>email: {user.email} phone: {user.phone} address: {user.address} </p>
                    <button onClick={toStage}> Go to Stage </button>
                    <p></p>
                    <button onClick={logOut}> Logout </button>
                </div>
            )
        case 'registered':
            return (
                <div className="homePage">
                    <img src={logo} alt="chat icon" width="256" height="256"></img>
                    <p><strong>Congratulations!</strong></p>
                    <p>Weclome.</p>
                    <p>Your account has been successfully created.</p>
                    <strong>Username: {keyWords.username}</strong>
                    <button onClick={toStage}> Go to Stage </button>
                    <p></p>
                    <button onClick={logOut}> Logout </button>
                </div>
            )

        case 'init':
            default:
                return (
                    <div className="homePage">
                        <img src={logo} alt="chat icon" width="256" height="256"></img>
                        <div>
                            <button onClick={()=>fn({...keyWords, homeState: "login"})}> Login </button>
                            &emsp;
                            <button onClick={()=>fn({...keyWords, homeState: "register"})}> Register </button>
                        </div>
                    </div>
                )
    }


}
export default Home


