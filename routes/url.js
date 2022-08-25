const express = require('express');
const router = express.Router();

const validUrl = require('valid-url');
const shortid = require('short-id');
const config = require('config');

const Url = require('../models/url');

router.post('/shorten', async (req, res, next) => {
    const { longUrl } = req.body;
    // console.log(req.body);
    const baseUrl = config.get('baseURL');

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid Base Url');
    }

    const urlCode = shortid.generate();
    // console.log(validUrl.isUri(longUrl));
    // console.log(urlCode);
    if (validUrl.isUri(longUrl)) {
        try {

            let url = await Url.findOne({ longUrl });
            // console.log(url);
            if (url) {
                res.json(url);
            } else {
                console.log('Generating new short url');
                const shortUrl = `${baseUrl}/${urlCode}`;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                });
                // console.log('before')
                await url.save();
                // console.log('after')
                res.json(url);
            }
        } catch (error) {
            return res.status(500).json('Server Error');
        }
    } else {
        return res.status(401).json('Invalid Long Url Input');
    }
})


module.exports = router;