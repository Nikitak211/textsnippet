const txtgen = require('txtgen');


const textgen = (req, res) => {
    const sum = req.body.score;
    const textsnippet = txtgen.sentence();
    const array = []
    for(let i = 0; i < sum ; i++){
        array.push([textsnippet])
    }
    res.send(array.toString());
}

module.exports = {
    textgen
}