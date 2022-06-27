const { sendSuccess } = require("../../utils/response");
const User = require("./user.model");
const { roles } = require("../../config/roles");

class Controller {
  async me(req, res, next) {
    const { _id: id } = req.user;

    // find user by id
    // send user details

    return sendSuccess(res, {});
  }

  async getUsers (req, res, next) {
    const users = await User.find({});
    res.status(200).json({
     data: users
    });
   }
   
   async getUser (req, res, next) {
    try {
     const userId = req.params.userId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }
   
   async updateUser (req, res, next) {
    try {
     const update = req.body
     const userId = req.params.userId;
     await User.findByIdAndUpdate(userId, update);
     const user = await User.findById(userId)
     res.status(200).json({
      data: user,
      message: 'User has been updated'
     });
    } catch (error) {
     next(error)
    }
   }

   async selectrole(req, res, next) { 
    const newUser = new User({
        role: req.body.role
    })
 
    newUser.save().then(user => res.json(user)).catch(err => res.status(404).json({ success: false })); 
 
  }
  async rolecheck(req, res, next) { 
    const role = req.params.role; 
    
    if(role == roles[0]){
      router.post((req,res)=>{
        
        const newInstitute = new Institutes({ name: req.body.institute});
        newInstitute.save().then(name => res.json(name)).catch(err => res.status(404).json({ success: false }));
        
        const newPrincipal = new Principal({
            name: req.body.name,
            institute: req.body.institute
        })
        newPrincipal.save().then(name => res.json(name)).catch(err => res.status(404).json({ success: false }));
      });
    } 
  }
}





module.exports = new Controller();
