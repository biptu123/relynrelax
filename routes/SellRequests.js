const express = require('express');
const SellRequest = require('../models/SellRequest');
const router = express.Router();


router.get('/sellrequests', async (req, res) => {
    try {
        const sellrequests = await SellRequest.find({});
        res.json({ success: true, sellrequests: sellrequests });
    } catch (error) {
        console.error('Error fetching sellrequests:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})

module.exports = router;