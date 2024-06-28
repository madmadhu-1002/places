import HttpError from "../models/http-error.js";
import User from "../models/user-schema.js";


export const getUsers = async (req,res,next) => {
    let users;
    try{
        users = await User.find();
    }catch(error){
        return next(error);
    }
    res.status(200).json({
        users
    });
}

export const getUserById = async (req,res,next) => {
    const userId = req.params.id;
    let user;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError(500,'Fetching user failed');
        return next(error);
    }
    if(!user){
        const error = new HttpError(404,'Could not find user');
        throw error;
    }
    res.status(200).json({
        user
    })
}

export const addUser = async (req,res,next) => {
    const {name,email,password} = req.body;
    let existedUser;
    try{
        existedUser = await User.findOne({email: email});
    }catch(error){
        return next(error);
    }
    if(!name || !email || !password){
        const error = new HttpError(404,'Invalid input');
        return next(error);
    }
    if(existedUser){
        const error = new HttpError(404,'User already exists');
        return next(error);
    }
    const newUser = new User({
        name,
        email,
        password
    });
    try{
        await newUser.save();
    }catch(err){
        const error = new HttpError(500,'Creating user failed');
        return next(error);
    }
    
    res.status(201).json({
        user: newUser
    });
}

