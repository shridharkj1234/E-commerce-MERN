const mongoose=require('mongoose');
require('dotenv').config();
const userData=require('./data/user');
const productData=require('./data/product');
const User=require('./model/userModel');
const Order=require('./model/orderModel');
const Product=require('./model/productModel');
const connectDB=require('./config/db');


connectDB();//call connction

//insert User

const importData=async()=>{
    try{
        const createdUserData=await User.insertMany(userData);
        const adminData=createdUserData[0].id;
        
        //merge product and owner(Admin for that product)
        const sampleProducts=productData.map(product=>{return {...product,user:adminData}})

        //created product data
        await Product.insertMany(sampleProducts);
        console.log('Data Imported');
        process.exit();    
    }catch(e){
        console.log(e.message);
        process.exit(1);
    }
}

importData();
// const destroyData=async()=>{
//     try{
//         await User.deleteMany();
//         await Product.deleteMany()
//         console.log('Data Destroy');
//         process.exit();    
//     }catch(e){
//         console.log(e.message);
//         process.exit(1);
//     }
// }

// if(process.argv[2]==='-d'){
//     destroyData()
// }else{
//     importData();
// }