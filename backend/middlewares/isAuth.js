import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "unauthenticated user"})
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken){
            return res.status(401).json({message: "unauthenticated user"})
        }
        console.log("decode token in isAuth middleware:", decodeToken); 
        req.userId = decodeToken.userId;
        next();
    }catch(error){
        return res.status(500).json({message: "server error in isAuth middleware", error: error.message})
    }
}