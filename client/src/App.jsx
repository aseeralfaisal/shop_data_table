import { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ShoppingApp from './pages/Shopping'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { setIsUserRole } from './redux/slice'

const App = () => {
    const dispatch = useDispatch()
    const isAdminRole = useSelector(state => state.slice.isAdminRole)
    const isUserRole = useSelector(state => state.slice.isUserRole)

    useEffect(() => {
        if (isAdminRole) {
            dispatch(setIsUserRole(false))
        } else {
            dispatch(setIsUserRole(true))
        }
    }, [isAdminRole, isUserRole])

    return (
        <BrowserRouter>
            <Routes>
                {isAdminRole && <Route path="/admin" element={<Admin />} />}
                {isUserRole && <Route path="/home" element={<ShoppingApp />} />}
                <Route path="/" index element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App