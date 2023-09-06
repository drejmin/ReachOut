// server.js
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/myMernDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
