import { useState } from 'react'
import Home from './homepage'
import Stage from './stage'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom"

// Three web page
// Home, Coversation, Chat

function App() {
    const [keyWords, setkeyWords] = useState({
            "homeState": "init",
            "username": "",
            "jwt": "",
            "userId": "",
            // "username": "ben",
            // "jwt": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzU5MTc1MGE1YjIxNDM2YmI5OGYxOCIsInVzZXJuYW1lIjoiYmVuIiwiaWF0IjoxNjY0NDU1MDkwfQ.uX8K85oud9-xqmVjIhJYPR7exgrgMuBqiP64mZEbh04",
        })

    const padding = {
        margin: '10px',
        listStyleType: 'none',
        width: '150px',
        textAlign: 'center',
        padding: '5px 10px',
        backgroundColor:'#00665f',
        color: 'white',
        border: '1px solid #00665f',
        textDecoration: 'none',
    }
  
    const modifyKeyWords = (info) => {
        setkeyWords(info)
      }

    return (
        <Router>
            <div>
                <Link style={padding} to="/">Home</Link>
                <Link style={padding} to="/Stage">Stage</Link>
            </div>

            <Routes>
                <Route path="/" element={<Home fn={modifyKeyWords} keyWords={keyWords}/>} />
                <Route path="/Stage" element={<Stage fn={modifyKeyWords} keyWords={keyWords}/>} />
            </Routes>
        </Router>
    )
}

export default App;
