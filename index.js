const express = require('express')
const cors = require('cors')
const app = express()
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const port = process.env.PORT || 4000
require('dotenv').config()

app.use(cors( {
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(express.json())
// app.use(jwt())
app.use(cookieParser())




// const verifyTokern=(req,res,next)=>{
// const token
// }




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
        // await client.connect();


        const othersSaysCollection = client.db('BuildingMangement').collection('othersays')
        const CuponCollection = client.db('BuildingMangement').collection('Cupon')
        const buildingCollection = client.db('BuildingMangement').collection('building')
        const userCollection = client.db('BuildingMangement').collection('user')
        const AnnounmentsCollection = client.db('BuildingMangement').collection('announcements')


// jwt token

app.post('/jwt',async(req,res)=>{
 const user = req.body
 console.log(user);
 const Token = jwt.sign( user,process.env.JWT_TOKEN,{expiresIn:'6h'})
 console.log(Token);
 res.
 cookie('token',Token,{
    httpOnly:true,
    secure:false
 })
 .send({success:true})

})




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
            const quary = {_id : new ObjectId(data)}
            const result = await userCollection.deleteOne(quary)
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
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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