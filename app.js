import express from 'express'
import winston from 'winston'
import dotenv from 'dotenv'

//use .env key
dotenv.config()

const app=express()

app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);