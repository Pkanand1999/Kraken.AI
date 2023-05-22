const mongoose = require('mongoose');

async function Database(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
     console.log('Database connected')
    }).catch(err => console.log(err));
 }
 
 module.exports = Database;