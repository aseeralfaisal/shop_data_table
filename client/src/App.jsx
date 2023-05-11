import React, { useState } from 'react'
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom"
import ShoppingApp from './pages/Shopping'
import Login from './pages/Login'
import Admin from './pages/Admin'


const App = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isUser, setIsUser] = useState(false)
    return (
        <BrowserRouter>
            <Routes>
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                {isUser && <Route path="/home" element={<ShoppingApp />} />}
                <Route path="/" index element={
                    <Login isUser={isUser} setIsUser={setIsUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App