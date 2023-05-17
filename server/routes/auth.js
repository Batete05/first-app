const router= require("express").Router();
const {User}=require("../models/user");
const joi= require('joi');
const bcrypt= require('bcrypt')


router.post("/", async(req,res)=>{
    try{
        // const{error}= validate(req.body);
        // if(error)
        // return res.status(400).send({message:err.details[0].message});

        const user=await User.findOne({email:req.body.email});

        if(!user)
        return res.status(401).send({message:"Invalid Email or Pssword"});

        const validPassword  = await bcrypt.compare(
            req.body.password, user.password
        );
        if(!validPassword)
        return res.status(401).send({message:"Invalid Email or Password"})

        const token= user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in sucessfully"})
    }
    catch(error){
        console.log(error)
res.status(500).send({message:"Internal Server Error"})
    }
})
const validate=(data)=>{
    const Schema=joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    })
}


module.exports= router;