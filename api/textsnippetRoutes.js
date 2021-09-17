const express = require("express");
const txtgen = require('txtgen');
const router = express.Router();

router.post('/generateText' , (req, res) => {
    let letters = /^[A-Za-z]+$/;
    const sum = req.body.score;
    const textsnippet = txtgen.paragraph([sum])
    if(sum === ""){
         res.send({error: 'please enter a number'})
    }
    else if (sum.match(letters)){
        res.send({error: 'please enter a number'})
    }
    else if (sum > 10 ){
        res.send({error: 'cannot ask more then 10'})
    }
    else if (sum <= 0 ){
        res.send({error: 'cannot ask 0 generates'})
    }else{
        res.send(textsnippet);
    }
})

module.exports = router;