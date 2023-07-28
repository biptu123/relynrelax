const express = require('express');
const multer = require('multer');
const SellRequest = require('../models/SellRequest');

const app = express();
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'https://github.com/biptu123/relynrelax/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Upload endpoint using Express Router
router.post('/upload',
    upload.fields([
        { name: 'owner_image' },
        { name: 'adhar_image' },
        { name: 'rc_image' },
        { name: 'back_image' },
        { name: 'side_image' }
    ]),
    async (req, res) => {
        
    const sellrequest = {
        user: req.body.user,
        reg_no: req.body.reg_no,
        phone_no: req.body.phone_no,
        price: req.body.price,
        brand: req.body.brand,
        type: req.body.type,
        specification: req.body.specification,
        km_ran: req.body.km_ran,
        age: req.body.age,
        purchased: req.body.purchased,
        owner_image: req.files['owner_image'][0].path,
        adhar_image: req.files['adhar_image'][0].path,
        rc_image: req.files['rc_image'][0].path,
        back_image: req.files['back_image'][0].path,
        side_image: req.files['side_image'][0].path
    };
    

        if (!req.files ||
            !req.files['owner_image'] ||
            !req.files['adhar_image'] ||
            !req.files['rc_image'] ||
            !req.files['back_image'] ||
            !req.files['side_image']
        ) {
        return res.status(400).json({ error: 'Please provide both owner_image and image files.' });
    }

    // File upload successful
    // return res.status(200).json({ message: 'Image uploaded successfully.' });
    try {
        await SellRequest.create(sellrequest);
        res.json({ success: true });
    }
    catch (err) {
        res.json({ success: false });
    }

});

module.exports = router;
