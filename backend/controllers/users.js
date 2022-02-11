import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/user.js';

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const existingUser = await user.findOne({ email });
        
        if(!existingUser)
            return res.status(404).json({message: "The user is not registered."});
        
        const isPassRight = await bcrypt.compare(password, existingUser.password);

        if(!isPassRight)
            return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, "test", {expiresIn: "1h"});

        return res.status(200).json({result: existingUser, token});
    }
    catch(e){
        res.status(500).json({message: `Something went wrong: ${e}`});
    }
};

export const signUp = async (req, res) => {
    const {email, password, confirmPass, firstName, lastName} = req.body;

    try{
        const existingUser = await user.findOne({ email });
        
        if(existingUser)
            return res.status(400).json({message: "The user is already registered."});
        
        if(password !== confirmPass)
            return res.status(400).json({message: "Passwords do not match."});
        
        const hashedPass = await bcrypt.hash(password, 12);       
        const result = await user.create({name: firstName, lastName, email, password: hashedPass});

        const token = jwt.sign( { email: result.email, id: result._id }, "test", { expiresIn: "1h" } );
        return res.status(200).json({result, token});
    }
    catch(e){
        console.log(e);
        res.status(500).json({message: `Something went wrong: ${e}`});        
    }

};