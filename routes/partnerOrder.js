const router = require('express').Router();
const Partner = require('mongoose').model('Partner');
const multer = require('multer');

router.get("/partner",(req,res)=>{
  Partner.find({},(err,details){
    if(!err){
      console.log(details);
    }else{
      console.log(err);
    }
  });
});

router.delete("/partner/close",(req,res)=>{

if(req.body.closed === true){
try{
  Partner.deleteOne({closed:true});
} catch(e){
  console.log("err "+e);
}

}

});

router.put("/partner/activity",(req,res)=>{

  if(req.body.status === true){
    Partner.updateOne({partnerid:req.body.id},{$set:{status:req.body.status}});
  }else {
    Partner.updateOne({partnerid:req.body.id},{$set:{status:req.body.status}});
  }

});

module.exports = router;
