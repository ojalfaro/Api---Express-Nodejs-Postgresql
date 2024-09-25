import express from "express";
import { PORT } from "./config.js";
import router from "./routes/ClientsRoutes.js";


const app = express()

app.use(express.json())

app.use('/api/v1',router)

app.listen(PORT,()=> {
    console.log('SERVER ON, IN PORT: ', PORT)
})

