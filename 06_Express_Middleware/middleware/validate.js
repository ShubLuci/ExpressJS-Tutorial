function validateUser(req,res,next) {
    const token = 'XYZ1';
    if(token!='XYZ')
        res.status(401).send("Unauthorized User");
    else
        next();
}

module.exports = {
    validateUser
}