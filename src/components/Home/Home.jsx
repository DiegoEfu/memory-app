import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {getPostsBySearch} from "../../actions/posts";
import useStyles from "./styles.js";
import {Form, Posts, Pagination} from "../index";

const Home = () => {
    const location = useLocation();
    const performQuery = () => new URLSearchParams(location.search);
    const [currId, setCurrId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = performQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const onKeyPress = (e) => {
        if(e.keyCode === 13){} // 13 keycode is the enter key.
            // Will search for the posts matching the contents in "search".
    };

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const searchPosts = () => {
        if(search.trim() || tags.join(",")){
            dispatch(getPostsBySearch({search, tags: tags.join(",")}));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
        } else{ 
            navigate("/posts");
        }
    };

    return (
        <Grow in>
                <Container>
                    <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={8}>
                            <Posts setCurrId = {setCurrId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField name='search' variant='outlined' label="Search Memories..." fullWidth value={search} onKeyPress={onKeyPress} onChange={(e)=>{setSearch(e.target.value)}}></TextField>
                                <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant='outlined' /> 
                                <Button variant='contained' onClick={searchPosts} className={classes.searchButton} color="primary">Search!</Button>
                            </AppBar>
                            <Form currId = {currId} setCurrId={setCurrId} />
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>                     
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;
