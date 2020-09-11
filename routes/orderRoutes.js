const router = require('express').Router();
const Order = require('mongoose').model('Order');
const multer = require('multer');

//Reference code.
/*app.use(multer({ dest: './uploads/',
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



app.post('/photo',function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = 'image/png';
 console.log(newItem);
 //newItem.save();
});*/



// Route to get all the active requirements for a particular shop
router.get('/active', async (req, res) => {
  const shopId=req.query.shopId;
  try{
    await Order.find({partner:shopId,active:true},(err,details)=>{
      console.log(details);
    });
  }catch(err){
    console.log(err);
  }

	// shop id should be provided as a query param
});

// Route to get the details of all the closed requirements for a particular shop
router.get('/closed',async (req, res) => {
	// shop id should be provided as a query param
  const shopId=req.query.shopId;
  try{

await Order.find({partner:shopId,active:false},(err,closed)=>{
  console.log(closed);
});


  }catch(err){
    console.log(err);
  }


});

// Route to place a new order
router.post('/', async (req, res) => {
  const {user,partner,deliveryAddress}=req.body;
  try{
    const order=new Order({user,partner,deliveryAddress});
    await order.save();
  }catch(err){
    console.log(err);
  }



});

// Route to cancel a particular order by user
router.put('/cancel/:orderId', async (req, res) => {
//const cancel=req.body.cancel;
//const orderId=req.params.orderId;
try{
  await Order.updateOne({_id:req.params.orderId},{$set:{cancel:req.body.cancel}});
}catch(err){
  console.log(err);
}
});

// Route to close a particular order
router.put('/close/:orderId',async (req, res) => {
  try{

          await Order.updateOne({_id:req.params.orderId},{$set:{actve:req.body.closed}});


  }catch(err){
    console.log(err);
  }

});

module.exports = router;
