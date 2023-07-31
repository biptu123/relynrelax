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

router.post('/updatesellrequest',
    async (req, res) => {

        console.log(req.body)

        try {
            const sellrequest = await SellRequest.findOneAndUpdate({ _id: req.body._id }, req.body);
            res.json({ success: true, sellrequest });
        }
        catch (err) {
            res.json({ success: false });
        }
    })

router.delete('/deletesellrequest/:id', async (req, res) => {
    try {
        const sellrequestId = req.params.id;
        const deletedSellRequest = await SellRequest.findByIdAndDelete(sellrequestId);

        if (!deletedSellRequest) {
            return res.status(404).json({ success: false, message: 'Sell Request not found' });
        }

        res.json({ success: true, message: 'Sell Request deleted successfully', sellrequest: deletedSellRequest });
    } catch (error) {
        console.error('Error deleting sellrequest:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;