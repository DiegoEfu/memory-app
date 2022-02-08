import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {GoogleLogin} from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import {signUp, signIn} from '../../actions/auth';

import { AUTH } from '../../constants/actions';
import Input from './Input';
import Icon from './icon';
import useStyles from "./styles";

const initialState = {firstName: '', lastName: '', password: '', email: '', confirmPass: ''};

const Auth = () => {
    const [showPass, setShowPass] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const handleShowPass = () => setShowPass((prev) => !prev);
    const navigate = useNavigate();
    const classes = useStyles();
    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if(isSignIn)
            dispatch(signIn(formData, navigate));
        else
            dispatch(signUp(formData, navigate));
    };

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const changeMode = () => {
        setIsSignIn((prev) => !prev)
        setShowPass(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //?. implies that "res" may not be defined.
        const token = res?.tokenId;
        try{
            dispatch({type: AUTH, data: {result, token}});
            navigate('/');
        } catch(e){
            console.log(e);
        }
    };

    const googleFailure = (error) => {alert("Google Sign In was unsuccessful.\n Error: " + error)};

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>{isSignIn ? "Sign In" : "Sign Up"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {!isSignIn && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={onChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={onChange} half/>                        
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={onChange} type="email" />
                        <Input name="password" label="Password" handleChange={onChange} type={showPass ? "text" : "password"} handleShowPass={handleShowPass}/>
                        {!isSignIn && (
                            <Input name="confirmPass" label="Repeat Pass" handleChange={onChange} type={"password"} />
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
                            {isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                    <GoogleLogin
                        clientId='268247116239-u9c4o8vbalel08g9mpegtfv93dibb1hb.apps.googleusercontent.com'
                        render={(renderProps)=>(
                            <Button fullWidth className={classes.googleButton} color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                Sign In with Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} sm={12}>
                            <Button onClick={changeMode} fullWidth>
                                {isSignIn ? "Don't have an account? Sign Up!" : "Already have an account? Sign In!"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
