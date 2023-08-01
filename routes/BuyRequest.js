const express = require('express');
const BuyRequest = require('../models/BuyRequest');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const buyrequests = await BuyRequest.find({});
        res.json({ success: true, buyrequests: buyrequests });
    } catch (error) {
        console.error('Error fetching buyrequests:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const buyrequests = await BuyRequest.find({ user: id });
        res.json({ success: true, buyrequests });
    } catch (error) {
        console.error('Error fetching buyrequests:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})


router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const buyrequest = await BuyRequest.findOneAndUpdate({ _id }, req.body, { new: true });
        res.json({ success: true, buyrequest });
    } catch (err) {
        res.json({ success: false });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedBuyRequest = await BuyRequest.findByIdAndDelete(_id);

        if (!deletedBuyRequest) {
            return res.status(404).json({ success: false, message: 'Buy Request not found' });
        }

        res.json({ success: true, message: 'Buy Request deleted successfully', buyrequest: deletedBuyRequest });
    } catch (error) {
        console.error('Error deleting buyrequest:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const buyrequest = await BuyRequest.create(req.body);
        res.json({ success: true, buyrequest });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, errors: err });
    }
})

module.exports = router;