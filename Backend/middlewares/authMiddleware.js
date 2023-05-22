const {loggedInUser}=require('../controller/authController');

async function authLoginUser(req, res, next) {
    try{
const brearHeader=req.headers['authorization'];
if(typeof brearHeader !== 'undefined') {
    const[prefix,token] = brearHeader.split(' ');
 const verification=await loggedInUser(token)
 req.verification=verification;
 next();
}else{
    return res.status(500).send({
        error: 'Something went wrong'
    })
}
    }catch(e){
        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
}
module.exports =authLoginUser;