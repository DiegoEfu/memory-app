import React, {useState, useRef} from 'react';
import {Typography, TextField, Button, Paper, Container} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const user = JSON.parse(localStorage.getItem('profile'))
    const [comment, setComment] = useState("");
    const commentsRef = useRef();

    const handleSubmit = async () => {
        const finalComment = `${user.result.name}:\n "${comment}"`;
        const newPost = await dispatch(commentPost(finalComment, post._id));
        setComments(newPost.comments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <div className={classes.commentsOuterContainer}>
            <Container className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments.map((comment, key) => (
                    <Paper key={key} style={{width: '80%', marginTop: '5px', marginBottom: '3px'}} elevation={1}>
                        <Typography gutterBottom variant='subtitle1'><strong>{comment.split(":\n")[0] + ": "}</strong>{comment.split(":\n")[1]}</Typography>
                    </Paper>))}
                    <div ref={commentsRef} />
            </Container>
            {user && (<div style={{width: '70%'}}>
                <Typography gutterBottom variant='h6'>Write a comment:</Typography>
                <TextField
                fullWidth 
                rows={4} 
                variant='outlined' 
                label='comment here'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                />
                <Button style={{marginTop: '10px'}} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleSubmit}>
                    Post Comment
                </Button>
            </div>)}
        </div>);
};

export default CommentSection;
