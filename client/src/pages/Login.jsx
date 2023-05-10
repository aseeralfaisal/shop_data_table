import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Button, Grid, CssBaseline, Link, Paper } from '@mui/material'
import useStyles from "./login.styles";
import IconTextField from '../components/IconTextField'
import HeaderComponent from '../components/Header'

const baseURI = import.meta.env.VITE_BASE_URI

const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [emailValue, setEmailValue] = useState('')
    const [passValue, setPassValue] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const changeUserType = () => setIsAdmin(!isAdmin)

    const handleLogin = async () => {
        try {
            const loginUser = await axios.post(`${baseURI}/loginuser`, {
                email: emailValue,
                password: passValue
            })
            if (loginUser.data) {
                const { accessToken, refreshToken } = loginUser.data;
                Cookies.set('accessToken', accessToken, { secure: true });
                Cookies.set('refreshToken', refreshToken, { secure: true });
                navigate('/home')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
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
                    <div className={classes.paper}>
                        <HeaderComponent />
                        <form className={classes.form} noValidate>
                            <IconTextField label="Email" type='email' value={emailValue}
                                setValue={setEmailValue} width={400} />
                            <IconTextField label="Password" type='password' value={passValue}
                                setValue={setPassValue} width={400} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="info"
                                sx={{ backgroundColor: "#333" }}
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
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Login