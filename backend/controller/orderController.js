const Order = require("../model/orderModel");
const asyncHandler = require("express-async-handler");
const { request } = require("express");
//@desc     Create new order
//@route    POST /api/order
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if(orderItems && orderItems.length===0){
      res.status(400);
      throw new Error('No order items');
      return
  }else{
      const order=new Order({
          orderItems,
          user:req.user._id,  
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })

      const createOrder=await order.save();
      res.status(201).json(createOrder)
  }

});

//@desc     GET order by ID
//@route    GET /api/order/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order= await Order.findById(req.params.id).populate('user', 'name email')

  if(order){
    res.json(order)
  }else{
    res.status(404);
    throw new Error('Order not found')
  }

});

//@desc     Update order to Paid
//@route    GET /api/order/:id/pay
//@access   Private
const updateOrderToPay = asyncHandler(async (req, res) => {
  const order= await Order.findById(req.params.id)
  if(order){
    order.isPaid=true;
    order.paidAt=Date.now();
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.payer.email_address
    }

    const updatedOrder=await order.save()
    res.json(updatedOrder)

  }else{
    res.status(404);
    throw new Error('Order not found')
  }

});
module.exports={addOrderItems,getOrderById,updateOrderToPay}