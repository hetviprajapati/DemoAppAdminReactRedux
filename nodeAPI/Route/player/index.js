var express=require('express');
var router=express.Router();
var chalk=require('chalk');
var Player=require('../../Schema/player');
var cors=require('cors');
var multer=require('multer');
var bcrypt=require('bcryptjs');
var jwt=require('../../Helper/jwtHelper.js');


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname);
  }
})

const upload=multer({
  storage:storage ,
  limits:{
    fileSize: 1024 * 1024 * 5
  }
});

router.use(express.json());
router.use('/uploads',express.static('uploads'));
router.use(cors());

router.post('/login',async function(req,res){
    try{
      var playerData=await Player.findOne({"email":req.body.email})
      var isMatch=await bcrypt.compare(req.body.password,playerData.password)
      if(isMatch){
        var obj={"id":playerData._id,"role":playerData.role}
        res.setHeader("auth_token","ID : "+obj.id+" Role :"+obj.role);
        return res.status(200).send(jwt.sign("SomeSecret",obj));
      }
      return res.status(401).send("Invalid Password")
   }catch(err){
      console.log(err);
        if(err)
            res.status(401).send("Invalid Email");
   }
 })

router.post('/create',upload.single('profile'),async function(req,res){
      var hashPassword=await bcrypt.hash(req.body.password,8);
      var profile='';
      if(req.file==undefined)
        profile='defaultuser.jpg';
      else  
        profile=req.file.originalname;
  
          var player=new Player({
          name:req.body.name,
          email:req.body.email,
          password:hashPassword,
          dob:req.body.dob,
          rolebowler:req.body.rolebowler,
          rolebatsman:req.body.rolebatsman,
          team:req.body.team,
          profile:profile
          });
     
      player.save().then(item=>{
            res.status(200).send("Saved Data Successfully");
      }).catch(err=>{
        if(err)
        {
            return res.status(400).send("Data not Saved"+err);  
        }   
      })
})

router.get('/get',async function(req,res){
     try{
        var player=await Player.find({role:"user"});
        res.status(200).json(player);
     }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
     }
})

router.put('/update/:id',upload.single('profile'),async function(req,res){
     var hashPassword=await bcrypt.hash(req.body.password,8);
      var profile='';
      if(req.file==undefined)
        profile='defaultuser.jpg';
      else  
        profile=req.file.originalname;
          var player={
          name:req.body.name,
          email:req.body.email,
          password:hashPassword,
          dob:req.body.dob,
          rolebowler:req.body.rolebowler,
          rolebatsman:req.body.rolebatsman,
          team:req.body.team,
          profile:profile
          };
    try{
        await Player.findByIdAndUpdate({_id:req.params.id},player)
        res.status(200).send(player);
    }catch(err){
        console.log(chalk.red("Error Occured"));
        res.status(400).send("Error while retriving record")
    }
})

router.delete('/delete/:id',async function(req,res){
    try{
        var player=await Player.findOneAndDelete({_id:req.params.id});
        res.status(200).send(player);
    }catch(err){
        console.log(chalk.red("Error Occured")+err);
        res.status(400).send("Error while retriving record")
    }
})

module.exports=router;