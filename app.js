const express = require('express');

const app = express();

app.use(express.static('./methods-public'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.post('/api/postman/people',(req, res)=>{
    let {html} = req.body
    if(!html){
        return res.status(400).json({success: false, msg:'Not a valid url'})
    }
    res.status(201).send({success: true })})


app.listen(5000, ()=> {
    console.log('listening on port 5000....')
})
