const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");



const register = async (req, res)=>{
    const {email, password, firstname, lastname}=req.body;

    try {
        if(!email || !password || !firstname || !lastname){
            return res.status(404).json({
                success: false,
                message: "Please input all fields"
            })
        }

        // check for user
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "user already exists"
            })
        }

        //create user
        const user = await User.create({
            email,
            firstname,
            lastname,
            password
        });


        const options = {
            email: email,
            subject: "welcome to My World",
            emailbody: `hello ${firstname}`
        }

        await sendEmail(options);

        //send response to user


        res.status(201).json({
            success: true,
            message: "User Created successfully"
        });


    } catch (error) {
        console.error("something went wrong", error);
        res.status(500).json({
            error: "something went wrong"
        });
    }
};

const login = async(req,res)=>{
    const {email, password}=req.body;


    //validate email and password
    if(!email || password) {
        return;
        res.status(404)
        .json({success:false, message: "please input all fields"})
    }

    //check user
    const user = awaituseer.findOne({email}).select("+password");
    if(!user){
        return;
        res.status(401).json({success: false, message: "User does not exist"});

    }
    //check if password match
    const isMatch = await user.matchpassword(password);
    if(isMatch){
        return res.status(404).json({success: false, message: "Invalid password"});

    }
    res.status(200).json({success: true, message:"Login Successful", data:user});
    };

    const deleteUser = async(req, res) =>{
        const user = req.params.id;

        const checkIfUserExist = await User.findById(user);

        if(!checkIfUserExist){
            res.status(400).json({success: false, message: "User does not exist"});
        }
        await User.deleteOne({_id: req.params.id});

        res.status(200).json({success: true, data: {}});
    };

    const updateDetails = async(req, res)=>{
        const filefsToUpdate={
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
        };

        const user = await User.findByIdAndUpdate(req.params.id, 
            fieldsToUpdate, {
                new: true,
                runValidators: true,
            });

            res.status(200).json({success: true, data: user});

    };

    const updatePassword = async(req, res)=>{
        const user = await User.findById(req.params._id).select("+password");

        //check current password
        if(!(await user.matchpassword(req.body.currentPassword)))
            {
                return res.status(401).json({success:false, message: "password is incorrect"});

            }

            user.password = req.bodynewPassword;
            await user.save();

            res.status(200).json({success:true, message: "Password updated"});
    }

    module.exports = {register,login, deleteUser, updateDetails, updatePassword};




