import { useState } from 'react'
import { Logout, Menu as MenuIcon } from '@mui/icons-material'
import { Box, Menu, Tooltip, IconButton, MenuItem, ListItemIcon } from '@mui/material'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export default function AccountMenu() {
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => {
        Cookies.remove('userName')
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('isAdminRole')
        Cookies.remove('isUserRole')
        navigate('/')
        setAnchorEl(null)
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip>
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
