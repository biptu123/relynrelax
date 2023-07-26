const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Admin = require('../models/Admin');
const jwtSecret = "THISISAJSONWEBTOKENFORSECURITYPURPOSE";

router.post('/createuser',
    [body('password').isLength({min: 5})],
    async (req, res) => { 

        // validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: 'Enter Valid Data' });
        }

        const user = await User.findOne({ phone_no: req.body.phone_no });

        if (user) {
            return res.status(400).json({ errors: "Phone number already exists" });
        }



        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
    try {
        await User.create({
            name: req.body.name,
            phone_no: req.body.phone_no,
            password: securePass
        });
        res.json({ success: true });
    }
    catch (err) {
        res.json({ success: false });
    }
    })

router.post('/loginuser',
    async (req, res) => {
        try {
            let user = await User.findOne({ phone_no: req.body.phone_no });
            if (!user) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }
            const passwordMatched = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatched) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = user._doc;
            const authToken = jwt.sign({ _id: data._id }, jwtSecret);
            return res.json({ success: true , authToken: authToken});
        }
        catch (err) {
            console.log(err);
            res.json({ success: false});
        }
    }) 
    
    
router.post('/createadmin',
    async (req, res) => {

        // validation 
      
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        try {
            await Admin.create({
                password: securePass
            });
            res.json({ success: true });
        }
        catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

router.post('/loginadmin',
    async (req, res) => {
        try {
            let admin = await Admin.findOne({ _id: req.body._id });
            if (!admin) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }
            const passwordMatched = await bcrypt.compare(req.body.password, admin.password);
            if (!passwordMatched) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = admin._doc;
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, adminAuthToken: authToken });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    }) 


module.exports = router;