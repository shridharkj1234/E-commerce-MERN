const express=require('express');
const path=require('path');
const morgan=require('morgan');
const connectDB =require('./config/db');
require('dotenv').config();
const productRouter=require('./router/productRoute');
const authUserRouter=require('./router/authUserRoute');
const orderRouter=require('./router/orderRoute');
const uploadRoute=require('./router/uploadRoute');

const {notFound,errorHandler} =require('./middleware/errorMiddleware');



const app=express();

if(process.env.NODE_ENV==='devlopement'){
  app.use(morgan('dev'))
}

app.use(express.json());

//mongodb connection
connectDB();

//convert all data of request body to json
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("ApI is running..");
})
app.use('/api/product',productRouter);
app.use('/api/user',authUserRouter);
app.use('/api/order',orderRouter);
app.use('/api/upload',uploadRoute);


 __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
//paypal middleware
// app.use()

//upload middlewear
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
//error handling middleware if wrong URL
app.use(notFound)
//error handling middlewear if wrong ID parameter
app.use(errorHandler);

app.listen(5000,()=>{
    console.log('Server running on port 5000');
})