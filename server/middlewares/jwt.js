const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, fullname: user.fullname, role: user.role },
        process.env.JWT_ACCESS_KEY,
        // { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
        { id: user.id, email: user.email, fullname: user.fullname, role: user.role },
        process.env.JWT_REFRESH_KEY,
        // { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
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
    VerifyToken
};
