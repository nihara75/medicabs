const router = require('express').Router();
const Order = require('mongoose').model('Order');
const multer = require('multer');

//Reference code.
/*app.use(multer({ dest: "./uploads/",
 rename: function (fieldname, filename) {
   return filename;
 },
}));

var Item = new ItemSchema(
  { img:
      { data: Buffer, contentType: String }
  }
);
var Item = mongoose.model('Images',ItemSchema);



app.post("/photo",function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = "image/png";
 console.log(newItem);
 //newItem.save();
});*/




router.get("/order",(req,res)=>{

const item = new Order();
Order.find({},(err,details)=>{
  if(!err){
    console.log(details);
  }else{
    console.log(err);
  }

});

});

router.post("/order",(req,res)=>{

  const { lalitude,longitude,place,storeid,image,cancel} = req.body;
  const newItem = new Order({ lalitude,longitude,place,storeid,image,status}); //image type is string and can be chandged  as per multer.
  newItem.save();
});


router.put("/order",(req,res)=>{    //to cancel the order
  if(req.body.cancel === true){
    try{
      Order.updateOne({orderid:req.body.id},{$set:{cancel:req.body.closed}});
    }catch(e){
      console.log(e);
    }
  }
});

module.exports = router;
