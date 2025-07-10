import User from "../models/users.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// register user

async function registerUser(req, res) {
  try {
    //fetch data from req.body
    const { name, password, email } = req.body;
    //validation on the data
    if (!name || !password || !email) {
      return res.status(404).json({
        message: "all  fields are required",
        success: false,
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
        success: false,
      });
    }

    //create new user
    const user = await User.create({ name, email, password });
    //if user cant create
    if (!user) {
      return res.status(500).json({
        message: "user cant created",
        success: false,
      });
    }

    //create token for user verification
    const token = crypto.randomBytes(32).toString("hex");
    //store token in user database
    user.verificationToken = token;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailObject = {
      from: process.env.MAIL_SENDER_ID,
      to: user.email,
      subject: "User Verification",
      text: `Welcome to  our company ! Please verify yourself by clicking upon the  link ${process.env.FRONTEND}/api/v1/auth/verify?token=${token}`,
    };

    const info = await transporter.sendMail(mailObject);

    //save user
    await user.save();
    // console.log(info);
    return res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "server error during user register",
      success: false,
      error: error.message,
    });
  }
}

//verify user 

const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(404).json({
        message: "token not found",
        success: false,
      });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({
        message: "user  not found",
        success: false,
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User verified successfully"
    });


  } catch (err) {
    console.log(err)
    res.status(500).json({
        message: "server error during user verify",
        success: false,
    });
  }
};

//login user

const loginUser = async(req,res) => {
  try {
    //fetch data
    const {email,password} = req.body;
    // validation
    if(!email || !password){
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }
    // check if user exist or not
    const user = await User.findOne({email});
    //if user not found
    if(!user){
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    } 
    //if user found match password
    const isMatch = await bcrypt.compare(password,user.password)
    // if wrong password enters
    if(!isMatch){
      return res.status(400).json({
        message: "wrong password",
        success: false,
      });
    }
    //if user is not verified
    if(!user.isVerified){
      return res.status(400).json({
        message: "user is not verified",
        success: false,
      });
    }
    //create token
    const token = user.getJwtToken();
    //set cookie
    res.cookie('token',token,{
      httpOnly:true,
      expires:new Date(Date.now() + 24*60*60*1000), 
    });
    

    res.status(200).json({
      success: true,
      message:'user logged in successfully',
      user
    })
  } catch (error) {
    
    res.status(500).json({
        message: "server error during user login",
        success: false,
        error: error.message,
    });
  }
}

//get profile 

const getUser = async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user){
      return res.status(400).json({
        success:false, 
        message:"user not found"
      });
    }

    res.status(200).json({
      sucess:true,
      message:'profile get successfully',
      user
    })
  } catch (error) {
    console.log(err)
    res.status(500).json({
        message: "server error during fetching profile",
        success: false,
    });
  }
}

//logout user

const logoutUser = async(req,res)=>{
  try {
    //clear cookie
    res.cookie('token','',{
      expires: new Date(0)
    });
    //send response
    res.status(200).json({
      sucess:true,
      message:'user log out SUCESSFULLY'
    })

  } catch (error) {
    console.log(err)
    res.status(500).json({
        message: "server error during logout user",
        success: false,
    });
  }
}


export { registerUser, verifyUser, loginUser, getUser, logoutUser}