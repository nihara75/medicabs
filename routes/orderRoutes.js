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
router.get('/active', (req, res) => {

});

// Route to get the details of all the closed requirements for a particular shop
router.get('/closed', (req, res) => {

});

// Route to place a new order
router.post('/', (req, res) => {

});

// Route to cancel a particular order by user
router.put('/cancel/:orderId', (req, res) => {

});

// Route to close a particular order
router.put('/close/:orderId', (req, res) => {

});

module.exports = router;
