let mongoose=require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.URL).then(()=>{
    console.log('connected at:'+process.env.URL);
}).catch((err)=>{
    console.log('not connected bjbnb',err)
});