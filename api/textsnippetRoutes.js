const express = require("express");
const txtgen = require('txtgen');
const router = express.Router();

router.post('' , function(req, res){
    const sum = req.body.score;
    const textsnippet = txtgen.paragraph([sum])
        res.send(textsnippet);
})

module.exports = router;