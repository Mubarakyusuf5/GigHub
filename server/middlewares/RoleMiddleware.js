const authorizeRoles = (...allowedRoles)=>{
    return (req, res, next) =>{
        if (!allowedRoles.includes(req.user.role)) {
            // console.log("role midlware", req.user, req.user.role)
            return res.status(403).json({message : "Access Denied"})
        }
        next()
    }
}

module.exports = authorizeRoles