
import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    const {page} = req.query;
    try{
        const LIMIT = 4;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await postMessage.countDocuments({});

        const posts = await postMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: posts, currentPage: Number(page), totalPages: Math.ceil(total/LIMIT) });
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new postMessage({...post, creator: req.userId});
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
};

export const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with such ID.");
    
    const updatedPost = await postMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const {id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with such ID.");
    
    const updatedPost = await postMessage.findByIdAndDelete(_id);
    res.json({message: "Post deleted successfully."});
};

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId)
        return json({message: "The user is not authenticated."});

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with such ID.");
    
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    } else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true});
    res.json(updatedPost);
};

export const searchPosts = async (req, res) => {
    const {searchQuery, tags} = req.query;
    try{
        
        const title = new RegExp(searchQuery, 'i');
        const posts = await postMessage.find({$or: [{title}, {tags: {$in: tags.split(",")}}]});

        res.json({data: posts});
    }
    catch(err){
        res.status(404).json({message: err.message});
    }  
};

export const getPost = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await postMessage.findById(id);
        res.status(200).json(post);        
    } catch (e) {
        res.status(404).json({message: e});      
    }
};

export const commentPost = async (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    try {
        const post = await postMessage.findById(id);
        post.comments.push(comment);
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true});
        res.status(200).json(post);        
    } catch (e) {
        res.status(404).json({message: e});      
    }
};