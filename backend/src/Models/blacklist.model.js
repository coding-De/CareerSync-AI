const mongoose = require("mongoose");


const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required:[  true, "Token is required for creating a blacklist token" ],
    }
},{
    timestamps:true
})

module.exports =
  mongoose.models.blacklistToken ||
  mongoose.model("blacklistToken", blacklistTokenSchema);

