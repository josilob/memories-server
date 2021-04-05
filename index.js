import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

const { PASSWORD } = process.env;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = `mongodb+srv://josilob:${PASSWORD}@cluster0.mk9uk.mongodb.net/memories?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.json({ status: 200, msg: 'Memories backend' });
});

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on Port: http://localhost:${PORT}`)
		)
	)
	.catch((error) => console.log(error.message));

const db = mongoose.connection;

db.on('error', (error) => console.log('Db connection error - ', error));
db.on('connected', () => console.log('Db connected to "memories" collection '));
db.on('disconnected', () => console.log('Db disconnected '));

mongoose.set('useFindAndModify', false); // no warning in console
