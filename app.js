const express = require('express');
const path = require('path');
const txtgen = require('txtgen');



const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//PATH to Public folder
app.use('/static', express.static(path.join(__dirname, 'public')))

// Create a new (GET METHOD) API route /generateText
// inside this route generate a text snippet using "txtgen" and send it as a response
app.all('/generateText', (req, res) => {
    const textsnippet = txtgen.sentence() ;
    
    res.send(textsnippet)
})


app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, './public/index.html'))
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Home page not found</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`'listening on port ${PORT}....'`));