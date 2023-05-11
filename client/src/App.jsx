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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" index element={<ShoppingApp />} />
                {isAdmin && (
                    <Route path="/admin" index element={<Admin />} />
                )}
                <Route path="/" index element={
                    <Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App