import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";

//create user function
export const createUser = async (req, res) => {
  try {
    const { name, age, gender, email, password } = req.body;
    if (!name || !age || !gender || !email || !password) {
      return res.status(200).json({ message: "All Fields are mandatory" });
    }

        // Check if the username is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    

    const newUser = new User({
      name,
      age,
      gender,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password not matched" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


//get all data

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

// find by param
export const getSingularUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error" });
  }
};

// update single user by id

export const updateSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" }); // Handle not found
    }
  } catch (error) {
    console.erreo(error);
    res.status(400).json({ message: "Got an Error in Catch Block" });
  }
};

//delete single record

export const deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id)
;
    if (user) {
      res.status(200).json({ message: "Successfully deleted User" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error found in catch block" });
  }
};


// forget password

export const forgetPassword = async (req, res) => {
  try {
   const {email} = req.body;
   const user = await User.findOne({email});
   console.log("User", user);

   const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: "daoudzubairjarral@gmail.com",
      pass: "gdpr xgmd kxax etgr"
}
})

   const cryptoo = crypto.randomBytes(8).toString('hex');

   const mailOptions = {
     from: "daoudzubairjarral@gmail.com",
     to: email,
     subject: "Sending Email",
     text: `your email is :${cryptoo}`
}

  transporter.sendMail(mailOptions)

  res.status(200).json({message: "Email sent successfully"})

} catch (error) {
   res.status(400).json({message: "error.message"})
}
}