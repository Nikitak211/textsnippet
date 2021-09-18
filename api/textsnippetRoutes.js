const express = require("express");
const txtgen = require('txtgen');
const router = express.Router();

router.post('/generateText' , (req, res) => {
    let letters = /^[A-Za-z]+$/;

    //gets the body of score from the fetch option.
    const sum = req.body.score;

    //generates a random text .
    const textsnippet = txtgen.paragraph([sum])

     // checks for letters and empty spaces, and bug preventing ..
      if ( sum === "") {
        res.send({error: 'Number Of Paragraphs , field cannot be empty.'})
    } else if ( isNaN(sum) ) {
        res.send({error: 'Number Of Paragraphs , field must contain only numbers.'})
    } else if ( sum > 10 ) {
        res.send({error: 'Number Of Paragraphs cannot be higher than 10.'})
    } else if ( sum <= 0 ) {
        res.send({error: 'Number Of Paragraphs cannot be lower than 1.'})
    } else {
        //sends data to the adress /generateText .
        res.send(textsnippet);
    }
})

module.exports = router;