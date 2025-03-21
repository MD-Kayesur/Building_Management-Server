const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000
require('dotenv').config()
app.use(cors())
app.use(express.json())









const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const othersSaysCollection = client.db('BuildingMangement').collection('othersays')
        const CuponCollection = client.db('BuildingMangement').collection('Cupon')
        const buildingCollection = client.db('BuildingMangement').collection('building')
        const userCollection = client.db('BuildingMangement').collection('user')
        const AnnounmentsCollection = client.db('BuildingMangement').collection('announcements')


        // othersSaysCollection
        app.get('/OtherSay', async (req, res) => {
            const result = await othersSaysCollection.find().toArray()
            res.send(result)
        })

        // CuponCollection

        app.get('/cupons', async (req, res) => {
            const result = await CuponCollection.find().toArray()
            res.send(result)
        })

        // buildingCollection

        app.post('/buildings', async (req, res) => {
            const data = req.body
            const result = await buildingCollection.insertOne(data)
            res.send(result)
        })

        app.get('/buildings', async (req, res) => {
            const result = await buildingCollection.find().toArray()
            res.send(result)


        })

        // userCollection
        app.post('/users', async (req, res) => {
            const data = req.body
            const result = await userCollection.insertOne(data)
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })


        app.delete('/users/:id', async (req, res) => {
            const data = req.params.id
            const result = await userCollection.deleteOne(data)
            res.send(result)
        })

        // AnnounmentsInfo
        app.post('/announcement', async (req, res) => {
            const data = req.body
            const result = await AnnounmentsCollection.insertOne(data)
            res.send(result)
        })


        app.get('/announcement', async (req, res) => {
            const result = await AnnounmentsCollection.find().toArray()
            res.send(result)
        })


        app.delete('/announcement/:id', async (req, res) => {
            const data = req.params.id
            const quary = {_id : new ObjectId(data)}
            
            const result = await AnnounmentsCollection.deleteOne(quary)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('building Mangement is starting')
})
app.listen(port, () => {
    console.log(`building Mangement is sitting on ${port}`);

})