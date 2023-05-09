import React from 'react'
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom"
import ShoppingApp from './pages/Shopping'
import Login from './pages/Login'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" index element={<ShoppingApp />} />
                <Route path="/" index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App