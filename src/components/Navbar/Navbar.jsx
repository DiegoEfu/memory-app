import React, {useState, useEffect, useCallback} from 'react';
import useStyles from "./styles.js";
import image from "../../assets/memories.png";
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';

import {LOGOUT} from "../../constants/actions";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate('/');
    localStorage.clear();
    setUser(null);
    window.location.reload();
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, user?.token]);

    return (
        <AppBar position='static' color="inherit" className={classes.appBar}>
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant='h4' align='center'>Memories</Typography>
                    <img src={image} alt="app logo" height="60" className={classes.image} />
                </div>
                
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name ? user?.result.name : user?.result.firstName} src={user?.result.imageUrl}>
                                {user?.result.name ? user?.result.name.charAt(0) : user?.result.firstName.charAt(0)}
                            </Avatar>
                            <div className={classes.userName}>
                                <Typography variant="h6">
                                    {user.result.name}
                                </Typography>
                            </div>
                            
                            <Button variant="contained" color="secondary" onClick={logout}>
                                Log Out
                            </Button>
                        </div>

                    ) : (
                        <div className={classes.profile}>
                            <Button component={Link} to="/auth" variant="contained" color="primary">
                                Sign In
                            </Button>
                        </div>
                        
                    )}
                </Toolbar>
        </AppBar>
    )
}

export default Navbar;
