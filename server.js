const express = require('express');
const app = express();
// const PORT = 3000;
const mongoose = require('mongoose');
const { PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bucketListItemsRoutes = require('./routes/api/bucketListItems')

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

mongoose
.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => console.log("MongoDB database connected!"))
.catch((error) => {
    console.log("Error: " + error);
})

app.use('/api/bucketListItems', bucketListItemsRoutes);
// app.get('/', (req, res) => res.send("Hello world!"));

app.listen(PORT, () => console.log("App live!"))