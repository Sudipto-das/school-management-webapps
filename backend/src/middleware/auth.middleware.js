const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denie" })
        }


        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", err })
    }
}


module.exports = authenticateToken;