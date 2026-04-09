
const User = require('../models/user.model.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userRegisterController = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            email
        })
        await newUser.save();
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err)
        throw err

    }
}


const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.status(200).json({ token, user })
    } catch (err) {
        console.log(err)
        throw err
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


module.exports = {
    userRegisterController, userLoginController, getUserProfile
}


