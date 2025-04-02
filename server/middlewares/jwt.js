const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (user) => {
    const accessToken = jwt.sign(
        { id: user.id, email: user.email, fullname: user.fullname, role: user.role },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "10m" }
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
        const validToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
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
        // req.user = decoded
        // Check if the refresh token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
        if (decoded.exp < currentTime) {
            res.clearCookie("refreshToken");
            return res.status(401).json({ message: "Refresh Token Expired" });
        }
        const accessToken = jwt.sign(
            { id: decoded.id, email: decoded.email, fullname: decoded.fullname, role: decoded.role },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "5m" }
        );

        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge:  5 * 60 * 1000 });
        return true;
    } catch (err) {
        return res.status(400).json({ message: "Invalid Refresh Token" });
    }
};

// const VerifyToken = (req, res, next)=>{
//     const accessToken = req.cookies["accessToken"];

//     if (!accessToken) {
//         return res.status(400).json({message: "User not Authenticated!"})
//     }
//     try {
//         const validToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
//         if (validToken) {
//             req.user = validToken;
//             req.authenticated = true
//             return next()
//         }
//     } catch (err) {
//         res.status(400).json({message: err.message})
//     }

// }

// const VerifyToken = (req, res, next) => {
//     const accessToken = req.cookies["accessToken"];

//     if (!accessToken) {
//         const newAccessToken = renewToken(req, res);
//         if (newAccessToken) {
//             req.cookies["accessToken"] = newAccessToken; // Update the request with the new token
//             return next();
//         }
//         return res.status(400).json({ message: "User not Authenticated!" });
//     }

//     try {
//         const validToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
//         req.user = validToken;
//         req.authenticated = true;
//         return next();
//     } catch (err) {
//         return res.status(400).json({ message: "Invalid Token" });
//     }
// };

// const renewToken = (req, res) => {
//     const refreshToken = req.cookies["refreshToken"];
//     if (!refreshToken) {
//         return null; // Instead of returning an HTTP response
//     }

//     try {
//         const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
//         const accessToken = jwt.sign(
//             { id: decoded.id, email: decoded.email, fullname: decoded.fullname, role: decoded.role },
//             process.env.JWT_ACCESS_KEY,
//             { expiresIn: "5m" }
//         );

//         res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 60000 * 5 });
//         return accessToken; // Return the new access token
//     } catch (err) {
//         return null;
//     }
// };


const VerifyResetToken = (req, res, next) => {
    const { resetToken } = req.body; 

    if (!resetToken) {
        return res.status(400).json({ message: "Reset token is required" }); 
    }

    try {
        const validToken = jwt.verify(resetToken, process.env.JWT_RESET_KEY);
        if (!validToken) {
            return res.status(400).json({ message: "Invalid reset token" });
        }
        // Check if the reset token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
        if (validToken.exp < currentTime) {
            return res.status(400).json({ message: "Reset token has expired" });
        }
        req.user = validToken; 
        return next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid or Expired Reset Token", err });
    }
};




module.exports = {
    createToken,
    VerifyToken,
    VerifyResetToken
};
