import React, {useEffect} from 'react';
import {Paper, Typography, CircularProgress, Divider, Card, CardMedia, CardContent} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {useParams, useNavigate} from 'react-router-dom';
import {getPost, getPostsBySearch} from '../../actions/posts';

import useStyles from './styles';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const {post, posts, isLoading} = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if(post)
      dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(",")}));
  }, [post, dispatch]);

  if(!post)
    return null;
  
  if(isLoading)
    return <Paper elevation={6} className={classes.loadingPaper}><CircularProgress /></Paper>
  
  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  const openPost = (_id) => navigate(`/posts/${_id}`);
  
  return (
    <Paper>
      <div className={classes.card}>
        <div className={classes.section}>
          <Divider />
          <Typography variant="h3" component="h2" style={{textAlign: 'center'}}>{post.title}</Typography>
          <Divider />
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">Created by: {post.name}</Typography>
          <Typography variant="h6">{post.message}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You may also like...</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(({_id, title, name, message, likes, selectedFile}) => (
              <Card style={{margin: "20px", cursor: "pointer"}} key={_id} onClick={() => openPost(_id)} elevation={3}>
                <CardContent>
                  <Typography gutterBottom variant='h6'>{title}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                  <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                  <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography>
                  <Divider />
                </CardContent> 

                <CardMedia style={{display: 'flex', justifyContent: 'center', paddingBottom: '5px'}}>
                  <img style={{width:'200px', maxWidth: '100%'}} src={selectedFile} alt={title} />
                </CardMedia>               
              </Card>
            ))}
          </div>
        </div>
      )}
    </Paper>
    
  );

};

export default PostDetails;
