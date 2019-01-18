const JWT = require('jsonwebtoken');
const secret = "fHt67hHRIOP89Fgddr5643fg4rhQAvmj7xv0wgxGHUsere";



//Return a token (life for 7 days) with user informations 
const signToken = user => {
    return JWT.sign({id:user.id, name:user.name, state:user.state, role:user.position}, secret, { expiresIn: "7 days"})
}


//Check token validity and expiration
const verifyToken = token => {
    return JWT.verify(token, secret, (err, decoded) => {

        //return NULL if err
        if(err) return null;

        //return informations of a user inside the token 
        return decoded;
    });
}

module.exports={verifyToken, signToken};