import React from 'react'
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom"
import ShoppingApp from './pages/Shopping'
import Login from './pages/Login'
import Admin from './pages/Admin'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" index element={<ShoppingApp />} />
                <Route path="/admin" index element={<Admin />} />
                <Route path="/" index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App