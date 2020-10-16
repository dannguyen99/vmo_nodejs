import express from 'express';
import winston from 'winston';
import dotenv from 'dotenv';
import projectType from './models/category/projectType.js';

//use .env key
dotenv.config();

const app = express();
app.use(express.json())

const validate = (model, data) => {
    const fields = projectType.schema.paths
    const names = Object.keys(fields)
    for (let index = 0; index < names.length - 2; index++) {
        const name = names[index];
        console.log(name, fields[name]['instance']);
        if (!name in data) {
            return false;
        }
        else{
             dataField = data[name]
        }
    }
}

app.use(express.json())
app.get('/', (req, res) => {
    const fields = projectType.schema.paths
    const names = Object.keys(fields)
    for (let index = 0; index < names.length - 2; index++) {
        const name = names[index];
        console.log(name, fields[name]['instance']);
    }
    res.send(projectType.schema.paths)
})

const expressPort = process.env.PORT || 3000;

app.listen(expressPort, () =>
    console.log('Example app listening on port 3000!'),
);