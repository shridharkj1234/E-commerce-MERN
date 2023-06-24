const express=require('express');
const {addOrderItems, getOrderById, updateOrderToPay} =require('../controller/orderController');
const {protect}=require('../middleware/authMiddleware');
const { route } = require('./productRoute');
const router=express.Router();

router.route('/').post(protect,addOrderItems);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPay);

module.exports=router
