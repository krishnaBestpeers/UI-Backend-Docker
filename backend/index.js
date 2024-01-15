const express = require('express')
const app = express()
const port = 3000
const database = require('./database');

app.get('/', async (req, res) => {
    const result = await database.client.db('docker').collection('docker')
        .find({})
        .toArray();
    res.status(200).json(result);

})
app.post('/', async (req, res) => {
    const { name, password } = req.body;

    const collection = database.client.db('docker').collection('docker');
    const todo = { name, password };
    await collection.insertOne(todo);
    res.status(201);
    res.json(todo);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})