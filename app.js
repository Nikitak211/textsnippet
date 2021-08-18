const express = require('express');
const path = require('path');
const logger = require('./midware/logger')
const members = require('./members')
const app = express();

// init middleware
// app.use(logger);





app.get('/api/members', (req, res) => res.json(members));

//Get Single Member
app.get('/api/members/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    
    if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}` });
    }
})


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, './public/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Home page not found</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('listening on port 5000....'));