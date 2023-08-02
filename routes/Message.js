const express = require('express');
const Message = require('../models/Message');
const router = express.Router();



router.post('/', async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.json({ success: true, message });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, errors: err });
    }
})


router.get('/', async (req, res) => {
    try {
        const messages = await Message.find({});
        res.json({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedMessage = await Message.findByIdAndDelete(_id);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        res.json({ success: true, message: deletedMessage });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const buyrequests = await BuyRequest.find({ user: id });
//         res.json({ success: true, buyrequests });
//     } catch (error) {
//         console.error('Error fetching buyrequests:', error);
//         res.status(400).json({ success: false, message: 'Internal server error' });
//     }
// })


// router.put('/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const buyrequest = await BuyRequest.findOneAndUpdate({ _id }, req.body, { new: true });
//         res.json({ success: true, buyrequest });
//     } catch (err) {
//         res.json({ success: false });
//     }
// });





module.exports = router;