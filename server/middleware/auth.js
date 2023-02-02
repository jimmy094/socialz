import jwt from "jsonwebtoken";

//create a verify token function with next parameter as third,
//try catch with an error message if token fails
//from req from frontend grab authorization header, thats where token will be set
//if token doesnt exist return 403 access denied
//if token start with bearer string take everything from right side of bearer thats how we grab token
// verify jwt token with secret string
//run next function will proceed to next step of function
//user verify token function in routes you need verification for.

export const verifyToken = async ( req, res, next) => {
    try {
        let token = req.header("Authorization");
    
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verfiy(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}