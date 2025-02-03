import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectDB } from './connectDB';

const app = express()

app.use(cors(
    {
        origin: config.CLIENT_URL
    }
))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())


import indexRouter from './routes/index';
app.use('/', indexRouter);

app.listen( config.PORT || 8000, () => {
    connectDB().then(() => { 
        console.log(`Server is running on port ${config.PORT || 8000}`)
    })
    .catch(err => {
        console.log(err)
        process.abort()
    })
})
