const express = require('express');
const bodyParser = require('body-parser');  
require('dotenv').config();

const schoolsRouter = require('./routes/schoolRoutes');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/', schoolsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the School API');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});