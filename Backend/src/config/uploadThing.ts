import {UTApi} from 'uploadthing/server'
import dotenv from 'dotenv'
dotenv.config(
    {
        path:'.env'
    }
)
export const utapi = new UTApi({
    token:process.env.UPLOADTHING_TOKEN,
})