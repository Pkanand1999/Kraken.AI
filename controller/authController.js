const User = require("../model/userModel")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {faker} = require('@faker-js/faker')
require('dotenv').config()

const SALT_ROUND = Number(process.env.SALT_ROUND);
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function generateToken(payload) {
    let token=await jwt.sign(payload, JWT_SECRET_KEY);
    return token;
}

async function verifyToken(token) {
    let payload =await jwt.verify(token, JWT_SECRET_KEY);
// console.log(payload,payload);
    return payload;
}

async function register(data){
    let userExist= await User.findOne({email:data.email});
    const a=bcrypt.hash(data.password, SALT_ROUND)
   data.password =await a;
    if(userExist){ throw new Error('User already exists with the given email')}
    let user = await User.create({name:data.name,email:data.email,password:data.password,authMode:"email-password",image:faker.internet.avatar(),credit:4});
    user.toJSON();
    delete user.password;
    return user;
}

async function login(email, password) {
    // console.log(email)
    let user = await User.findOne({email});
    const match = await bcrypt.compare(password, user.password)
    console.log(user)
    if(user===null){
        throw new Error('User does not exist with the given email')
    }
    else if(!match){
        throw new Error('Password is incorrect');
    }
    else if(user.email===email && match===true){
       user= user.toJSON();
        delete user.password;
        console.log(user.email)
        let token=await generateToken(user.email);
        user.token=token;
        console.log(user)
        return user;
    }

}

async function loggedInUser(token) {

    let user =await verifyToken(token);
    let reload =await User.findOne({$or:[{email:user.email},{email:user}]});
    reload=reload.toJSON();
    console.log(reload);
    console.log("reload")
    // delete reload.password;
    return reload;
}

async function loginByGoogle(data){
    // console.log(data.email);
    let userExist = await User.findOne({email:data.email});
    if(userExist){ 
        userExist=userExist.toJSON();
        let token=await generateToken(userExist);
        userExist.token=token;
        let user = {...userExist}
        return {user};
    }
    let user = await User.create({name:data.name,email:data.email,image:data.picture,authMode:"google-redirect",credit:4});
    user=user.toJSON();
    console.log(user);
    let token=await generateToken(user);
        user.token=token;
        return {user};
}

module.exports = {
    register,login,loggedInUser,loginByGoogle,
}