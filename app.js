const express = require('express');
const path = require('path');
const textsnippet = require('./api/textsnippetRoutes');
const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//PATH to Public folder
app.use('/static', express.static(path.join(__dirname, 'public')))

// posts a textsnippet to the page.
app.use('/api/generateText', textsnippet )

// route to main index page.
app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, './public/index.html'))
})

// route to every possible 404.
app.all('*', (req, res) => {
    res.status(404).send('<h1>Home page not found</h1>')
})

// PORT for the server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`'listening on port ${PORT}....'`));