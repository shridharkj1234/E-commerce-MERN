const User=require('../model/userModel');
const asyncHandler=require('express-async-handler');
const generateToken=require('../util/generateToken');


//@desc     Create new user
//@route    POST /api/user
//@access   Public
const createUser= asyncHandler (async (req,res)=>{
    const {name ,email,password}=req.body;
    const userExists=await User.findOne({email:email})
    if(userExists){
        throw new Error('User is already exists')
        res.send(400);
    }

    const user=await User.create({
        name:name,
        email:email,
        password:password
    })
    if(user){
        res.status(201).json({user,token:generateToken(user._id)});
    }else{
        res.status(401);
        throw new Error('Invalid user data');
    }
})

//@desc     Login user with protected token
//@route    POST /api/user/login
//@access   Public
const authUser= asyncHandler (async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email})
    if(user && (await user.matchPassword(password))){
        res.json({user,token:generateToken(user._id)});
    }
    else{
        
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

//@desc    Get user profile
//@route    GET /api/user/profile
//@access   Private
const getUserProfile= asyncHandler (async (req,res)=>{
    console.log(req.user._id);

    const user=await User.findById(req.user._id)
    if(user){
        res.json(user)
    }else{
        res.status(404);
        throw new Error('User Not Found')
    }

})

//@desc    Update user details
//@route    PUT /api/product/profile
//@access   Private
const updateUserProfile= asyncHandler (async (req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updateUser=await user.save();
        res.json({updateUser,token:generateToken(updateUser._id)})
    }else{
        res.status(404);
        throw new Error('User Not Found')
    }

})

//@desc    Get all user
//@route    GET /api/user
//@access   Private/Admin
const getUser= asyncHandler (async (req,res)=>{
        const users=await User.find({})
        res.json(users)
})


//@desc    Delete User
//@route    DELETE /api/user/:id
//@access   Private/Admin
const deleteUser= asyncHandler (async (req,res)=>{
        const user=await User.findById(req.params.id)
        if(user){
            await user.remove();
            res.json({message:'User Removed'})
        }else{
            res.status(404);
            throw new Error('User not found')
        }
})

//@desc    Get user by id
//@route    GET /api/user/:id
//@access   Private/Admin
const getUserById= asyncHandler (async (req,res)=>{
    const user=await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404);
        throw new Error('User not found')
    }
})

//@desc    Update user 
//@route    PUT /api/user/:id
//@access   Private/Admin
const updateUser= asyncHandler (async (req,res)=>{

    const user=await User.findById(req.params.id)
    console.log(user);
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        user.isAdmin=req.body.isAdmin || user.isAdmin;

        const updateUser=await user.save();
        res.json(updateUser)
    }else{
        console.log('Hiii')
        res.status(404);
        throw new Error('User Not Found')
    }

})

module.exports={createUser,authUser,getUserProfile,updateUserProfile,getUser,deleteUser,getUserById,updateUser}