import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import User from "../models/User.js";

//register user
//create a salt from bcrypt, use salt to encrypt password
//viewed profile and impressions are dummy data
// once newUser is saved send back a response with the savedUser
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};

//Logging in
//destructure email and password from req.body
//use mongoose to find user email in db
//if statement to return error if user isnt found
//sign jwt token with user id and also pass in secret string from env file
//delete password so it doenst get sent back to front end
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}
