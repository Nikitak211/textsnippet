const txtgen = require('txtgen');


const textgen = (req, res) => {
    const sum = req.body.score;
    const textsnippet = txtgen.paragraph([sum])
        res.send(textsnippet);
}

module.exports = {
    textgen
}