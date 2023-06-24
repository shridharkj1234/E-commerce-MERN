const express=require('express');
const {authUser, getUserProfile, createUser,updateUserProfile, getUser, deleteUser, getUserById, updateUser} =require('../controller/authUserController');
const router=express.Router();
const {protect,admin}=require('../middleware/authMiddleware');

router.route('/').post(createUser).get(protect,admin,getUser);;
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).put(protect, admin, updateUser)
router.get('/:id',protect,admin,getUserById)


module.exports=router;
