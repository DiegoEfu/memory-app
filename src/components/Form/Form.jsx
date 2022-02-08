import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts.js';

const Form = ({currId, setCurrId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currId ? state.posts.posts.find((p) => p._id === currId) : null)
    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    useEffect(() => {
        if(post)
            setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currId)
            dispatch(updatePost(currId, { ...postData, name: user?.result?.name }));
        else
            dispatch(createPost({...postData, name: user?.result?.name}, navigate));
        
        clear();
    };
    
    const clear = () => {
        setCurrId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: ""
        });
    };
    if(!user?.result?.name)
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other people's memories.
                </Typography>
            </Paper>
        );
    else
        return (
            <Paper className={classes.paper}>
                <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currId ? "Editing" : "Making"} a Memory...</Typography>
                    <TextField 
                    name='title' 
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={postData.title}
                    onChange={(e) => {setPostData({...postData, title: e.target.value})}}
                    />
                    <TextField 
                    name='message' 
                    variant='outlined'
                    label='Message'
                    fullWidth
                    value={postData.message}
                    onChange={(e) => {setPostData({...postData, message: e.target.value})}}
                    />
                    <TextField 
                    name='tags' 
                    variant='outlined'
                    label='Tags'
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => {setPostData({...postData, tags: e.target.value.split(",")})}}
                    />

                    <div className={classes.fileInput}>
                            <FileBase
                            type="file"
                            tooltip=" "
                            multiple={false}
                            onDone={({base64}) => setPostData({...postData, selectedFile: base64}) }
                            />
                    </div>

                    <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>
                        Submit
                    </Button>

                    <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>
                        Clear
                    </Button>

                </form>
            </Paper>
        )
};

export default Form;
