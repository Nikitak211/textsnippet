const express = require('express');
const path = require('path');
const logger = require('./midware/logger')

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
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Home page not found</h1>')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('listening on port 5000....'));