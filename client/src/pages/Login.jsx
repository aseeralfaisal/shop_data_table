import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Link, Paper, Box, Alert, colors, Typography } from '@mui/material'
import { ChangeCircle } from '@mui/icons-material'
import useStyles from './styles/login.styles'
import IconTextField from '../components/IconTextField'
import HeaderComponent from '../components/Header'
import Cookies from 'js-cookie'
import Api from '../services/Api.interceptor'
import { setIsAdminRole } from '../redux/slice'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classes = useStyles()

    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isSignUpMode, setIsSignUpMode] = useState(false)

    const isAdminRole = useSelector(state => state.slice.isAdminRole)

    const toggleUserRole = () => dispatch(setIsAdminRole(!isAdminRole))
    const toggleSignUpMode = () => setIsSignUpMode(!isSignUpMode)

    const RoleTitle = () => {
        let title = null
        if (isAdminRole) {
            isSignUpMode ? title = 'Register as Admin' : title = 'Sign in as Admin'
        } else {
            isSignUpMode ? title = 'Register as User' : title = 'Sign in as User'
        }
        return <Typography component='span'>{title}</Typography>
    }

    const validator = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(emailValue)) {
            setErrorMsg('Invalid email format')
            return
        }

        if (passValue.length < 8) {
            setErrorMsg('Password should be at least 8 characters long')
            return
        }
    }
    
    const handleLogin = async () => {
        try {
            validator()
            const endpoint = isAdminRole ? '/loginadmin' : '/loginuser'
            const headers = isAdminRole ? { "x-user-role": 'admin' } : {}

            const response = await Api.post(endpoint, {
                email: emailValue,
                password: passValue
            }, { headers });

            const { accessToken, refreshToken, username } = response.data
            Cookies.set('accessToken', accessToken)
            Cookies.set('refreshToken', refreshToken)
            Cookies.set('userName', username)

            if (response.status === 200) {
                if (isAdminRole) {
                    navigate('/admin')
                } else {
                    navigate('/home')
                }
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            navigate('/')
        }
    }

    const handleRegister = async () => {
        try {
            validator()
            const endpoint = isAdminRole ? '/createadmin' : '/createuser'
            const response = await Api.post(endpoint, {
                email: emailValue,
                name: nameValue,
                password: passValue,
                created_by: nameValue
            });
            if (response.status === 200) {
                setIsSignUpMode(false)
            }
        } catch (error) {
            console.error(error)
            navigate('/')
        }
    }


    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid
                    className={classes.size}
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={1}
                    square
                >
                    <Box className={classes.paper}>
                        <HeaderComponent />
                        <Button
                            fullWidth
                            variant='contained'
                            startIcon={<ChangeCircle />}
                            sx={{
                                backgroundColor: colors.grey[100], color: colors.grey[800], mt: 5, boxShadow: 0,
                                '&:hover': { backgroundColor: colors.grey[200], boxShadow: 0 }
                            }}
                            onClick={toggleUserRole}
                        >
                            <RoleTitle />
                        </Button>
                        <form className={classes.form}>
                            {isSignUpMode ?
                                <>
                                    <IconTextField label="Email" type='email' value={emailValue}
                                        setValue={setEmailValue} width={400} />
                                    <IconTextField label="Name" type='text' value={nameValue}
                                        setValue={setNameValue} width={400} />
                                    <IconTextField label="Password" type='password' value={passValue}
                                        setValue={setPassValue} width={400} />
                                </>
                                :
                                <>
                                    <IconTextField label="Email" type='email' value={emailValue}
                                        setValue={setEmailValue} width={400} />
                                    <IconTextField label="Password" type='password' value={passValue}
                                        setValue={setPassValue} width={400} />
                                </>
                            }
                            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="info"
                                sx={{ backgroundColor: colors.grey[800] }}
                                className={classes.submit}
                                onClick={(e) => {
                                    e.preventDefault();
                                    isSignUpMode ? handleRegister() : handleLogin()
                                }}
                            >
                                {isSignUpMode ? 'Register' : 'Sign In'}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={toggleSignUpMode} variant="body2" color={"#555"} sx={{ cursor: 'pointer' }}>
                                        {isSignUpMode ? "Already have an account? Sign in" : "Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Login