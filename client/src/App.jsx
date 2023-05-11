import React, { useEffect, useState } from 'react'
import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom"
import ShoppingApp from './pages/Shopping'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser } from './redux/slices/UserRoleSlice'

const App = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.userRole.isAdmin)
    const isUser = useSelector(state => state.userRole.isUser)

    console.log({ isAdmin, isUser })

    useEffect(() => {
        if (isAdmin) {
            dispatch(changeUser(false))
        } else {
            dispatch(changeUser(true))
        }
    }, [isAdmin, isUser])

    return (
        <BrowserRouter>
            <Routes>
                {isAdmin && <Route path="/admin" element={<Admin />} />}
                {isUser && <Route path="/home" element={<ShoppingApp />} />}
                <Route path="/" index element={
                    <Login />
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App