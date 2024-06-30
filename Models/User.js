const mongoose = require('mongoose');



const UserSchema = mongoose.Schema(
    {

    
    firstname:{
        type: String,
        required: [true, " please add your firstname"],
        maxlength: [50, "DFirstname cannot be more than 50 characters"]
    },

    lastname:{
        type: String,
        required: [true, " please add your lastname"],
        maxlength: [50, "Lastname cannot be more than 50 characters"]
    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "User already exist"],
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, "Please add a valid email"]
    },

    password:{
        type: String,
        required: [true, "please add a passsword"],
        minlength:8
    },
},
    {
        timestamps: true,
    }
    
)
module.exports = mongoose.model("Users", UserSchema);