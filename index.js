const express = require('express')
const app = express()
const cors = require('cors');
//const admin = require("firebase-admin");
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 5000;

//const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://appTest:appTest@cluster0.y1dxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('my-login-app');
        const usersCollection = database.collection('userdata');

        // app.get('/products', verifyToken, async (req, res) => {
        app.get('/products', async (req, res) => {
            const email = req.query.email;
            const date = req.query.date;
            const query = { email: email, date: date }
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.json(products);
        })

        //Get all Users
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find({}).toArray();
            res.send(result);
            console.log(result);
        })

        //Add User by POST Method API
        app.post('/addUser', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        //GET User
        app.get('/user/:email', async (req, res) => {
            const result = await usersCollection.find({
                email: req.params.email,
                password: req.params.password,
            }).toArray();
            res.send(result);
        });
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Login System by Imriaz !!')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})