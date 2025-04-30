import jwt from 'jsonwebtoken';
import User from '../models/user.js';

//generate token

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
//register user

export const registerUser = async (req, res) => {
    const {fullName, email, password ,profileImageUrl}=req.body;

    if(!fullName || !email || !password) {
        return res.status(400).json({message: 'Please fill all fields'})
    }

    try{
        //check if user exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'})
        }
        //create user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });
        res.status(201).json({
            _id: user._id,
                user,
            token: generateToken(user._id),
        }
            
        )
    }
    catch(error){
        res.status(500).json({message: 'Server error'})
    }

}

//login user

export const loginUser = async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message: 'Please fill all fields'})
    }
    try{
        const user =await User.findOne({email});
        //check if user exists
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        //check if password is correct
        if(!user || !(await user.matchPassword(password))){
            return res.status(400).json({message: 'Invalid credentials'})
        }
        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id),
        })
    }
    catch(error){
        res.status(500).json({message: 'Server error'})
    }
}




//get user info
export const getUserInfo = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message: 'Server error'})
    }
}