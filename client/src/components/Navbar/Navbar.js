import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Avatar, Button, Typography } from '@material-ui/core'
import useStyles from './styles'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        setUser(null)
        history.push('/auth')
    }

    useEffect(() => {
        // JWT
        const token = user?.token;

        if (token) {
        const decodedToken = decode(token);

        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <div className={classes.brandContainer}>
                    <Typography className={classes.heading} component={Link} to='/' variant='h2' align='center'>Posts</Typography>
                    {/* <img src={memories} height='60 /' */}
                </div>

                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.username} src={user?.result.imageUrl}>{user.result.username.charAt(0)}</Avatar>

                            <Typography variant='h6' className={classes.userName}>{user.result.username}</Typography>

                            <Button onClick={logout} variant='contained' className={classes.logout} color='secondary'>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' color='primary' variant='contained'>SignIn</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
