import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { jwtAuthenticate } from './middleware/jwtAuthenticate.js';
import Admin from './models/admin.js';
import autoGenerateToken from './helper/autoGenerateToken.js';
import login from './routes/adminRoute.js'
import projectTypeRoute from './routes/category/projectType/projectTypeRoute.js';

//use .env key
dotenv.config();

const app = express();
app.use(express.json())

app.post('/login', login)


app.use(jwtAuthenticate)

app.use('/', projectTypeRoute)


const DB_URI = 'mongodb://localhost:27017/vmo_nodejs'
const expressPort = process.env.PORT || 3000;
mongoose.Promise = global.Promise;

mongoose.connect(DB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }).then(async () => {
        const result = await Admin.find({});
        if (result.length == 0)
            autoGenerateToken()
        app.listen(expressPort, () =>
            console.log(`App is listening on port http://localhost:${expressPort}/`)
        );
    })