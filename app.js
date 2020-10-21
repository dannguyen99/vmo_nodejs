import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwtAuthenticate from './middleware/jwtAuthenticate.js';
import validObjectId from './middleware/validObjectId.js';
import Admin from './models/admin.js';
import autoGenerateToken from './helper/autoGenerateToken.js';
import login from './routes/adminRoute.js'
import projectTypeRoute from './routes/category/projectTypeRoute.js';
import projectStatusRoute from './routes/category/projectStatusRoute.js'
import techStackRoute from './routes/category/techStackRoute.js'
import customerGroupRoute from './routes/category/customerGroupRoute.js'
import employeeRoute from './routes/management/employeeRoute.js'

//use .env key
dotenv.config();

const app = express();
app.use(express.json())

app.post('/login', login)


app.use(jwtAuthenticate)
app.use('/*/:id', validObjectId)

app.use('/', projectTypeRoute, projectStatusRoute, techStackRoute, customerGroupRoute, employeeRoute)

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