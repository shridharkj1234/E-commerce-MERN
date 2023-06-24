const bcrypt=require('bcryptjs');

const user=[{
        name:'Shridhar Kamble',
        email:'admin123@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Tanuja',
        email:'tanuja123@gmail.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'yogesh Kamble',
        email:'yogesh123@gmail.com',
        password:bcrypt.hashSync('123456',10),
    }
]

module.exports=user