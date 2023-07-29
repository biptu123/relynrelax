const express = require('express');
const cloudinary = require('../utils/cloudinary');
const SellRequest = require('../models/SellRequest');
const router = express.Router();


// Upload endpoint using Express Router
router.post('/upload', async (req, res) => {
    // Upload the image
    try {
        const owner_image_result = await cloudinary.uploader.upload(req.body.owner_image, {
            folder: 'relynrelax',
            quality: 60,
            width: 500,
            height: 500
        })
        const adhar_image_result = await cloudinary.uploader.upload(req.body.adhar_image, {
            folder: 'relynrelax',
            quality: 60,
            width: 500,
            height: 500
        })
        const rc_image_result = await cloudinary.uploader.upload(req.body.rc_image, {
            folder: 'relynrelax',
            quality: 60,
            width: 500,
            height: 500
        })
        const side_image_result = await cloudinary.uploader.upload(req.body.side_image, {
            folder: 'relynrelax',
            quality: 60,
            width: 500,
            height: 500
        })

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
            owner_image: {
                public_id: owner_image_result.public_id,
                url: owner_image_result.secure_url
            },
            adhar_image: {
                public_id: adhar_image_result.public_id,
                url: adhar_image_result.secure_url
            },
            rc_image: {
                public_id: rc_image_result.public_id,
                url: rc_image_result.secure_url
            },
            side_image: {
                public_id: side_image_result.public_id,
                url: side_image_result.secure_url
            },
        };


    try {
        await SellRequest.create(sellrequest);
        res.json({ success: true });
    }
    catch (err) {
        console.error(err);
        res.json({ success: false });
    }
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
    

    });


module.exports = router;
