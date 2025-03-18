const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, fullname: user.fullname, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id, email: user.email, fullname: user.fullname, role: user.role },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: "7d" } //need jwt decode to check if expired thens log's out
    );

    const resetToken = jwt.sign(
        { id: user.id },
        process.env.JWT_RESET_KEY,
        { expiresIn: "15m" } // Token expires in 15 minutes
    );

    return { accessToken, refreshToken, resetToken };
};

const VerifyToken = (req, res, next) => {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
        if (renewToken(req, res)) {
            return next();
        }
        return res.status(400).json({ message: "User not Authenticated!" });
    }

    try {
        const validToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = validToken;
        req.authenticated = true;
        return next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};

const VerifyResetToken = (req, res, next) => {
    const { resetToken } = req.body; 

    if (!resetToken) {
        return res.status(400).json({ message: "Reset token is required" }); 
    }

    try {
        const validToken = jwt.verify(resetToken, process.env.JWT_RESET_KEY);
        req.user = validToken; 
        return next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid or Expired Reset Token", err });
    }
};


const renewToken = (req, res) => {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res.status(404).json({ message: "No Refresh Token" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        const accessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, fullname: decoded.fullname, role: decoded.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "1m" }
        );

        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 60000 });
        return true;
    } catch (err) {
        return res.status(400).json({ message: "Invalid Refresh Token" });
    }
};

module.exports = {
    createToken,
    VerifyToken,
    VerifyResetToken
};
