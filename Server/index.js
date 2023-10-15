import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import {connectDB} from './Mongodb/connect.js';
import postRoutes from './Routes/postRoutes.js'
import dalleRoutes from './Routes/dalleRoutes.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({
    limit:'50mb'
}));

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);

app.get('/',async (req,res)=>{
    res.send('Hello there❤️');
});

const startServer = async ()=>{
    try {
        connectDB();
        app.listen(8080,()=>console.log('Server has started on post http://localhost:8080 '));
}
     catch (error) {
        console.log(error);
    }
}       

startServer();