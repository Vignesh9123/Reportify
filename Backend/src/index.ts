import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectDB } from './connectDB';
import { rateLimit } from 'express-rate-limit'
const app = express()

const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 1 minute'
})
app.use(cors(
    {
       origin:config.CLIENT_URL,
       credentials: true
    }
))
app.set('trust proxy', 1)
app.use((req, res, next) => {
    console.log('Client IP:', req.ip);
    console.log('X-Forwarded-For:', req.headers['x-forwarded-for']);
    next();
  });
  
app.use(apiRateLimiter)
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
