import axios from 'axios';

const API = axios.create({baseURL: "https://memories-api-with-users.herokuapp.com/" });

API.interceptors.request.use((req) => {
    const json = JSON.parse(localStorage.getItem('profile'));
    if(json)
        req.headers.authorization = `Bearer ${json?.token}`;
    
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page || 1}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updated) => API.patch(`/posts/${id}`, updated);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, {comment});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);