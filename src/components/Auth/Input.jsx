import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Input = ({half, name, label, autoFocus, type, handleChange, handleShowPass}) => {

    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
            name={name} 
            label={label} 
            onChange={handleChange} 
            variant="outlined"
            autoFocus={autoFocus}
            fullWidth
            type={type}
            InputProps={name === "password" ? {
                endAdornment: (<InputAdornment position='end' >
                    <IconButton onClick={handleShowPass}>
                        {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>)
            } : null}
            />            
        </Grid>
    );
};

export default Input;
