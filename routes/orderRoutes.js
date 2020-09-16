const express = require("express");
const router = require('express').Router();
const Order = require('mongoose').model('Order');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const app = express();

const { authenticatedOnly } = require('../middlewares/authMiddleware')

router.use(authenticatedOnly);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    fs.mkdir('./uploads/',(err)=>{
       cb(null, './uploads/');
    });
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage: storage });




// Route to get all the active requirements for a particular shop
router.get('/active', async (req, res) => {
	console.log(req.user);

	const shopId = req.user.id;
	try{
		const activeOrders = await Order.find({ partner: shopId, active: true });

		res.send({ success: true, activeOrders });
	} catch(err){
		res.send({ success: false, message: err.message });
	}

	// shop id should be provided as a query param
});

// Route to get the details of all the closed requirements for a particular shop
router.get('/closed', async (req, res) => {
	// shop id should be provided as a query param
	  // const { shopId } = req.query;
	const shopId = req.user.id;

	try{
		const closedOrders = await Order.find({ partner: shopId, active: false });
		res.send({ success: true, closedOrders });

	} catch(err){
		res.send({ success: false, message: err.message });
	}

});

// Route to place a new order
router.post('/',upload.single('image'), async (req, res) => {
  const obj = {
        user:req.body.id,
        partner:req.body.part,
        deliveryAddress:req.body.address,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
  await  Order.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {

            res.send({success:true,item});
        }
    });
});

// Route to cancel a particular order by user
router.put('/cancel/:orderId', async (req, res) => {
//const cancel=req.body.cancel;
//const orderId=req.params.orderId;
	// const userId = req.user.id;
	const { orderId } = req.params;
	try{
		await Order.updateOne({	_id: orderId, user: userId }, { $set: { cancel: true, closed: true } });

		res.send({ success: true, message: 'Order cancelled succesfully' });
	} catch(err){
		res.send({ success: false, message: err.message });
	}
});

// Route to close a particular order
router.put('/close/:orderId',async (req, res) => {

	const shopId = req.user.id;
	const { orderId } = req.params;
	try{
		await Order.updateOne({ _id: orderId, partner: shopId }, { $set: { active: false } });

		res.send({ success: true, message: 'Order closed succesfully' });
	} catch(err){
		res.send({ success: false, message: err.message });
	}
});

module.exports = router;
