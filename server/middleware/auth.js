import jsonwebtoken from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token  = req.headers.authorization;

    try{
        jsonwebtoken.verify(token, process.env.JWT_SECRET);
        next();
    }catch(error){
        res.send({success: false, message:'Invalid Token'});
    }
}

export default auth;