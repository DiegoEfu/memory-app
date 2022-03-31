import React from 'react';
import {Grid, CircularProgress} from '@material-ui/core'; 

import Post from "./Post/Post.jsx";
import useStyles from './styles';
import { useSelector } from 'react-redux';

const Posts = ({setCurrId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    
    return isLoading ? <CircularProgress /> : (
    <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
                <Post post={post} setCurrId = {setCurrId} />
            </Grid>
        ))}
    </Grid>);
}

export default Posts;
