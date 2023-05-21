const express = require('express');

let {register,login,loginByGoogle}=require('../controller/authController');
const authLoginUser = require('../middlewares/authMiddleware');
const UserAuth=express.Router();



UserAuth.post('/register',async function(req, res){
    try{
        let data =await req.body;
        // console.log(data)
let user =await register(data)
console.log(user)
  res.status(201).send("user successfully registered");
}catch(e){
 res.status(500).send('User already exists with the given email')
}
})

UserAuth.post('/login', async (req, res) => {
    let data=req.body;
    try{
        let user = await login(data.email, data.password)
        return res.status(200).send(user)
    }catch(e){
         res.status(500).send('something went wrong')
    }
})

UserAuth.get('/loggedInUser', authLoginUser, async (req, res) => {
    try {

        const user =await req.verification;
        return res.status(200).send({
            data: user
        })

    } catch(err) {
        console.error(err.message);

        return res.status(500).send({
            error: 'Something went wrong'
        })
    }
})

UserAuth.post('/googlelogin',async function(req, res) {
    let data = req.body;
    try{
        let user =await loginByGoogle(data);
        console.log(user);
 return res.status(200).send(user);
}catch(e){
 res.status(500).send('User already exists with the given email')
}
})



module.exports =UserAuth;