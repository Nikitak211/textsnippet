const express = require('express');
const path = require('path');
const logger = require('./midware/logger')
const txtgen = require('txtgen');

const app = express();

// init middleware
// app.use(logger);

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//PATH to Public folder
app.use(express.static(path.join(__dirname, 'public')))

// API route
app.use('/api/members', require('./routes/api/members'))


app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, './public/index.html'))
    const submit = document.getElementById('submit');
    submit.addEventListener('click', textUp);

    function textUp(){
       const parent  = document.getElementById('parent')
        const child = document.createElement('li')
        const total = document.createTextNode(TEXT);
        child.appendChild(total);
        parent.replaceChild(child, parent.childNodes[0]);


    }


})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Home page not found</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('listening on port 5000....'));