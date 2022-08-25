const express = require('express');

const path = require('path');

const router = express.Router();


const Url = require('../models/url');

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve('index.html'));
})

router.get('/*', async (req, res, next) => {
    // joining the values to form a string
    let str = '';
    for (p in req.params) str += req.params[p];
    // console.log(str);
    try {
        const finalUrl = await Url.findOne({ urlCode: str });
        // console.log(finalUrl);
        if (finalUrl) {
            return res.status(201).redirect(finalUrl.longUrl);
        } else {
            return res.status(404).json('URL not found');
        }

    } catch (error) {
        return res.status(500).json('Server Error');
    }
})

module.exports = router;
