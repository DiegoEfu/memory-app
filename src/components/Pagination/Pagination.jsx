import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import {Link} from 'react-router-dom';

import { getPosts } from '../../actions/posts';
import useStyles from "./styles";

const Paginate = ({page}) => {
  const {totalPages} = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(page)
      dispatch(getPosts(page));    
  }, [page, dispatch]);

  return (
    <Pagination className={classes.ul} count={totalPages} page={Number(page)} variant="outlined" color="primary" renderItem={(item) => (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />)} />
  );
};

export default Paginate;
