import jwt from 'jsonwebtoken'

export const requiredSignIn = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).send({
            success: false,
            message: 'No token provided or token does not start with Bearer'
        });
    }
    const token = req.headers.authorization?.split(' ')[1]?.trim();
    if (!token) {
        return res.status(401).send({
          success: false,
          message: 'No token provided',
        });
      }
    try {
        const decode =  jwt.verify(token, process.env.JWT);
        console.log("Token:", token);
        console.log("decode:", decode);

// console.log("Secret Key:", process.env.JWT);
        if(!decode){
            res.status(401).send({
                success: false,
                message: 'you are not authorized'
            })
        }
        
         req.user = decode
         next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        res.status(500).send({
            success: false,
            message: 'Internal server error',
            error : error.message
        })
    }

}