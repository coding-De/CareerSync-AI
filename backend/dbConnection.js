const mongosse = require("mongoose");

function connectiondb(){
mongosse.connect(process.env.MONGO_URI)
.then((msg)=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log(err);
    process.exit(1);
})
}

module.exports = connectiondb;