import mongoose from "mongoose";
import { config } from "../config";


export async function connectDB(){
    try{
        const connection = await mongoose.connect(config.MONGO_URL,{dbName: config.ENVIRONMENT == 'dev'? 'dev': 'production'})
        console.log(`MongoDB Connected: ${connection.connection.host}`)

        connection.connection.on('disconnected', () => {
            console.log('MongoDB disconnected')
        })
        connection.connection.on('connection', () => {
            console.log('MongoDB reconnected')
        })
    }
    catch(err){
        console.log(err)
        process.abort()
    }
}