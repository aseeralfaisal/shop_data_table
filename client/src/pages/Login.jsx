import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, Link, Paper, Box, ButtonGroup, colors } from '@mui/material'
import useStyles from "./styles/login.styles";
import IconTextField from '../components/IconTextField'
import HeaderComponent from '../components/Header'
import Cookies from 'js-cookie'
import Api from '../services/Api.interceptor'
import { ChangeCircle } from '@mui/icons-material';

const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const changeUserType = () => setIsAdmin(!isAdmin)

    const handleLogin = async () => {
        try {
            let response = null
            if (isAdmin) {
                response = await Api.post(`/loginadmin`, {
                    email: emailValue,
                    password: passValue
                })
            } else {
                response = await Api.post(`/loginuser`, {
                    email: emailValue,
                    password: passValue
                })
            }
            const { accessToken, refreshToken, username, role } = response.data
            Cookies.set('accessToken', accessToken)
            Cookies.set('refreshToken', refreshToken)
            Cookies.set('userName', username)
            if (response.status === 200) {
                if (role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/home')
                }
            } else {
                navigate('/')
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                            onClick={changeUserType}
                        >
                            {isAdmin ? 'Sign in as Admin' : 'Sign in as User'}
                        </Button>
                        <form className={classes.form}>
                            <IconTextField label="Email" type='email' value={emailValue}
                                setValue={setEmailValue} width={400} />
                            <IconTextField label="Password" type='password' value={passValue}
                                setValue={setPassValue} width={400} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="info"
                                sx={{ backgroundColor: colors.grey[800] }}
                                className={classes.submit}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2" color={"#555"}>
                                        {"Don't have an account? Sign Up"}
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