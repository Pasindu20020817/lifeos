const jwt = require ("jsonwebtoken");

/**
 * Authentication Middleware
 *
 * Purpose:
 * - Check if JWT token exists
 * - Verify token
 * - Attach decoded user data to req.user
 */
const authenticate = (req, res, next) => {
    try{
        // Get Authorization header 
        const authHeader = req.headers.authorization;
        
        // Check if header exists
        if(!authHeader){
            return res.status(401).json ({
                success: false,
                message: "Access denied. No token provided.",
            });
        }

        /**
        * Expected format:
        *
        * Authorization: Bearer eyJhbGciOi...
        */
        const token = authHeader.split (" ")[1];

        //Check token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format",
            });
        }
        
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        //Store decoded user data
        req.user = decoded;

        //continue to next middleware/controller
        next();
        

    } catch(error){
        console.error("Auth Middleware error:", error);

        return res.statue(401).json({
            success: false,
            message: "Invalide or expired token",
        });

    }
};

module.exports = authenticate;