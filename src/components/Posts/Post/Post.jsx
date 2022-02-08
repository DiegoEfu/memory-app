import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from './styles';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from "../../../actions/posts.js";

const Post = ({post,setCurrId}) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
        if (post.likes.length >= 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`);        
    };

    return (
        <Card className={classes.card}>
            <ButtonBase className={classes.cardAction} onClick={openPost} component="span">
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            </ButtonBase>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.title}</Typography>
                    <Typography variant='body1'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>

                <div className={classes.overlay2}>
                    <Button disabled={user?.result?.googleId === post.creator || post.creator !== user?.result._id} style={{color: 'white'}} size='small' onClick={()=>{setCurrId(post._id)}}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag}`).join(" ")}</Typography>
                </div>

                <CardContent>
                    <Typography className={classes.title} variant='h5' gutterBottom>{post.message}</Typography>
                </CardContent>
            
            <CardActions className={classes.cardActions}>
                <Button disabled={!user?.result} size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>

                <Button disabled={user?.result?.googleId === post.creator || post.creator !== user?.result._id} size="small" color="secondary" onClick={()=> dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
};

export default Post;
