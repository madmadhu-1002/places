import User from "../models/user-schema.js";
import HttpError from "../models/http-error.js";

const verifyUser = async (req, res, next) => {
    const {email, password} = req.body;
    let existedUser;
    try{
        existedUser = await User.findOne({email: email, password: password});
    }catch(err){
        const error = new HttpError(404,'Fetching user failed');
        return next(error);
    }
    if(!existedUser){
        const error = new HttpError(404,'Could not find user');
        return next(error);
    }
  res.send("Hello World!");
}

export default verifyUser;