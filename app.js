const express = require('express');
const path = require('path');
const textsnippet = require('./api/textsnippetRoutes');
const app = express();

//body parser Midware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//PATH to Public folder
app.use('/static', express.static(path.join(__dirname, 'public')))

// posts a textsnippet from the api\textsnippetRoutes.js to the page.
app.use('/api', textsnippet )

// route to main public/index.html page.
app.get('/', (req, res) => {
    res.sendFile(path.resolve( __dirname, './public/index.html'))
})

// route to 404 errors.
app.all('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>')
})

// PORT and listen for the server.
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`listening on port ${PORT}....`));