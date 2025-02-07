import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectDB } from './connectDB';

const app = express()

app.use(cors(
    {
       origin:"https://reportify-ai.vercel.app",
       credentials: true
    }
))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())


import indexRouter from './routes/index';
app.use('/api', indexRouter);
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
})

connectDB().then(() => {
    app.listen(config.PORT ||8000, () => {
        console.log(`Server is running on port ${config.PORT || 8000}`);
    })
})
