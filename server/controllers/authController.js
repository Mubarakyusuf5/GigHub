const Users = require("../models/userModel.js");
const { comparePassword, hashPassword } = require("../middlewares/hash.js");
const { createToken } = require("../middlewares/jwt.js");
const { sendEmail } = require("../middlewares/emailService.js");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // const exist = await Users.findOne({ email });
        // if (exist) {
        //     return res.status(400).json({ message: "Email already exists" });
        // }

        const hashedPassword = await hashPassword(password);
        const newUser = await Users.create({
            fullname,
            email,
            role,
            password: hashedPassword,
        });

        // sends welcome email to registered user
        // const login = `${process.env.CLIENT_URL}/login`,
        // clientLink = `${process.env.CLIENT_URL}/client/dashboard`, freelancerLink=`${process.env.CLIENT_URL}/dashboard`
        //   const templatePath = path.join(__dirname, "../templates/welcome-template.html");
        //   const source = fs.readFileSync(templatePath, "utf-8");
        //   const template = handlebars.compile(source);
        //   const emailTemplate = template({ fullname, login, clientLink, freelancerLink });
        // await sendEmail(email, "Welcome Email", emailTemplate);

        res.status(200).json({ message: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        if (user.status === "Suspended") {
            return res.status(400).json({ message: "This account has been suspended temporarily." });
        }

        if (user.status === "Blocked") {
            return res.status(400).json({ message: "This account has been blocked." });
        }

        const { accessToken, refreshToken } = createToken(user);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 2 * 60 * 1000, 
        });
        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 1000, 
            // maxAge: 60 * 1000, 
        });        

        res.status(200).json({ message: "Login successful", user, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

const getUser = (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        res.status(200).json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    logout,
};
