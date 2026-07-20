const jwt = require("jsonwebtoken");
const tokenblacklistModel = require("../Models/blacklist.model");


const authUser = async (req, res, next) => {
    console.log(req);
    const token = 
      req.cookies?.token || 
      req.headers.authorization?.split(" ")[1];

    if (!token) {
       return res.status(401).json({
            message: "Token is required"
        })
    }

    const isBlacklisted = await tokenblacklistModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({
            message: "Token is invalid"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = {authUser};
