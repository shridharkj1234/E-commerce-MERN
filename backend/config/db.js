const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true
        })
        console.log(`Successful ${conn.connection.host}`);
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

module.exports=connectDB;
