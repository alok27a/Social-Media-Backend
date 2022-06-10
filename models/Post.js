const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true
   },
   desc: {
        type: String,
        max: 500
   },
   img:{
       type: String
   },
   likes : {
       type: Array
   }
   
})

module.exports = mongoose.model("Post", PostSchema)