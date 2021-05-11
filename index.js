import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

const { CONNECTION_URL } = process.env;

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

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
		app.listen(PORT, () => console.log(`Server running designated port`))
	)
	.catch((error) => console.log(error.message));

const db = mongoose.connection;

db.on('error', (error) => console.log('Db connection error - ', error));
db.on('connected', () => console.log('Db connected'));
db.on('disconnected', () => console.log('Db disconnected '));

mongoose.set('useFindAndModify', false); // no deprecation warning in console
