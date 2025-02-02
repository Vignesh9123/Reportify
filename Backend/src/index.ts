import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { connectDB } from './connectDB';

const app = express()

app.use(cors(
    {
        origin: process.env.CLIENT_URL
    }
))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())


app.listen( config.PORT || 8000, () => {
    connectDB().then(() => { 
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    .catch(err => {
        console.log(err)
        process.abort()
    })
})
