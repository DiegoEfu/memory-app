import * as api from "../api";
import {DELETE, UPDATE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, START_LOADING, END_LOADING, COMMENT} from "../constants/actions";

//Action Creators: Functions which return actions.

export const getPosts = (page) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});
    } catch(e){
        console.log(e);
    }
};

export const getPost = (id) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});
    } catch(e){
        console.log(e);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data:{data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    } catch (e) {
        console.log(e);        
    }
};

export const createPost = (post, navigate) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);
        dispatch({type: CREATE, payload: data});
        navigate(`/posts/${data._id}`);
        dispatch({type: END_LOADING});
        
    }
    catch(e){
        console.log(e);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    }
    catch(e){
        console.log(e);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    }
    catch(e){
        console.log(e);
    }
};

export const likePost = (id) => async (dispatch) => {
    try{
        const {data} = await api.likePost(id);
        dispatch({type: UPDATE, payload: data});
    }
    catch(e){
        console.log(e);
    }
};

export const commentPost = (comment, id) => async (dispatch) => {
    try {
        const {data} = await api.commentPost(comment, id);
        await dispatch({type: COMMENT, payload: data});
        return data;
    } catch (e) {
        console.log(e);        
    }
};