/** @module router */
const express = require("express");
const txtgen = require('txtgen');
const router = express.Router();

/** @typedef {object} post posting to a route from an api. */
router.post('/generateText' , (req, res) => {

    /**
    * @typedef {Number} Sum requesting the body data of score {@link requestPayload}. 
    */
    //gets the body of score from the fetch option.
    const sum = req.body.score;

    /**
    * @typedef {String} txtgen an npmjs util that generates random sentences, paragraphs and articles in English.
    * links to {@link textsnippet}. 
    * you can check more at {@link https://www.npmjs.com/package/txtgen}
    */
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
        /**
        * @typedef {string} textsnippet sends data to the route /generateText as {@link data} to textSnippet .  
        */
        res.send(textsnippet);
    }
})
 
module.exports = router;