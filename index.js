require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const postRoutes = require('./routes/posts.js');

const app = express();

app.use('/posts', postRoutes);

const { USERNAME, PASSWORD } = process.env;
const CONNECTION_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.mk9uk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// newer way, without warnings >4.16 express version
// app.use(body.json({ limit: '30mb', extended: true }));
// app.use(app.urlencoded({ limit: '30mb', extended: true }));
// older way without bodyParser out of the box
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); // no warning in console
