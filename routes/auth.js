const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt  = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require("../models/user");
// const { baseModelName } = require('../models/User');


// @route  GET api/auth
// @desc  get logged in user
// @acces Private

router.get('/',auth, async (req,res)=>{  
    try {
        const user =  await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');  
    }
});    



// @route  POST api/auth
// @desc  Auth user & get token
// @acces Public

router.post('/',[
    body('email', 'Please enter a vaild email').isEmail(),
    body('password', 'Password is required').exists()
] , 
    async (req,res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }


        const {email ,password} = req.body ;  
 
        try{
            let user =  await User.findOne({email});

            if(!user){
                 return res.status(400).json({msg: "Invalid Crudentials "})
            }

            const isMatch  =  await bcrypt.compare(password , user.password);

            if(!isMatch){
                return res.status(400).json({msg: "Invalid Crudentials "})
           }

           const payload ={
            user :{
                id: user.id
                  }
          };


            jwt.sign(payload, config.get("jwtSecret"), {
                expiresIn :360000
            },(err,token)=>{
                if(err) throw err;
                res.json({token});
            }) ;
        }
        catch (err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
});
 
/*
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

*/

module.exports = router ;




