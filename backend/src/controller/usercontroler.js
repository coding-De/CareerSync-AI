const userModel = require("../Models/model");
const blacklistModel = require("../Models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const resisteruserControler = async (req,res)=>{
    const { username , password , email } = req.body;

    if(!username || !password || !email){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isUserExist = await userModel.findOne({ $or:[{ email: email }, { user: username }] })
    if(isUserExist){
        return res.status(400).json({
            message: "User already exists"
        })
    }
    
    const user = await userModel.create({
        name: username,
        password,
        email: email
    })

    const token = jwt.sign({ id: user._id, username: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log(token)
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
});
    res.status(201).json({ message: "User created successfully" });
}

const loginuserControler = async (req,res)=>{
    const { email , password } = req.body;

    const user = await userModel.findOne({ email });

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ id: user._id, username: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
});
    res.status(200).json({ message: "Login successful" });
}

const logoutuserControler= async (req,res)=>{
    const token = req.cookies.token;
    if(token){
        await blacklistModel.create({
            token: token
        })
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    }
}

const getMeControler = async (req,res)=>{
    const user = await userModel.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }
    res.status(200).json({ user });
}

module.exports = {resisteruserControler, loginuserControler, logoutuserControler, getMeControler};
