const express = require("express");
const router = require('express').Router();
const Order = require('mongoose').model('Order');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({

  destination: function(req, file, cb) {
    fs.mkdir('./routes/uploads/',(err)=>{
       cb(null, './routes/uploads/');
    });
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({ storage });

const { authenticatedOnly } = require('../middlewares/authMiddleware')

// Middlewares
router.use(authenticatedOnly);


// Route to get all the active requirements for a particular shop
router.get('/active', async (req, res) => {
	// console.log(req.user);

	const shopId = req.user.id;
	try{
		const activeOrders = await Order.find({ partner: shopId, active: true });

		res.send({ success: true, activeOrders });
	} catch(err){
		res.send({ success: false, message: err.message });
	}

});

// Route to get the details of all the closed requirements for a particular shop
router.get('/closed', async (req, res) => {

	const shopId = req.user.id;

	try{
		const closedOrders = await Order.find({ partner: shopId, active: false });
		res.send({ success: true, closedOrders });

	} catch(err){
		res.send({ success: false, message: err.message });
	}

});

// Route to place a new order
router.post('/', upload.single('image'), async (req, res) => {
		
	const { parnter, address } = req.body;
	
	const obj = {
		user: req.user.id,
		partner: parnter,
		deliveryAddress: address,
		image: {
			data: fs.readFileSync(path.join( __dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}

	try {
		const item = await Order.create(obj);
		item.save();

		res.send({ success: true, message: 'Order placed succefully', item });
	} catch(err) {
		return res.send({ success: false, message: err.message });
	}
});

// Route to cancel a particular order by user
router.put('/cancel/:orderId', async (req, res) => {

	const userId = req.user.id;
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
