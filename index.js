const express = require('express');
const app = express();
const cors = require('cors');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j8qj17k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


    const allDataCollection=client.db('assignment11DB').collection('users');

    const allDataCollection2=client.db('assignment11DB').collection('assets');





// -------------------------------Only for operations---------------------

app.post('/allUsers',async(req,res)=>{
    const allData = req.body;
    console.log(allData);

    const result = await allDataCollection.insertOne(allData);
    res.send(result);
})


app.get('/allUsers', async(req,res)=>{
    const cursor = allDataCollection.find()
    const results = await cursor.toArray();
    res.send(results);
})




app.get('/allUsers/:email', async(req,res)=>{
  const email = req.params.email;
  const query = {email:email}
  const cursor = await allDataCollection.find(query);
  const result = await cursor.toArray();
  res.send(result);
})


//above is ok and  post and get method is ok


app.delete('/allUsers/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = allDataCollection.deleteOne(query);
    res.send(result);
})


    // Update
    app.put('/allUsers/:id', async(req,res)=>{
        const id=req.params.id;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
        const updatedUser=req.body;
        const user = {
            $set:{
                service_name:updatedUser.service_name,
                service_image:updatedUser.service_image,
                price:updatedUser.price,
                service_area:updatedUser.service_area,
                service_description:updatedUser.service_description,
                email:updatedUser.email,
                provider_name:updatedUser.provider_name,
                provider_imageURL:updatedUser.provider_imageURL,
            }
        }
        const result = await allDataCollection.updateOne(filter, user,options);
        res.send(result);
    })


// This portion for asset collections------------------------------------------------------

app.post('/assets',async(req,res)=>{
  const allData = req.body;
  // console.log(allData);

  const result = await allDataCollection2.insertOne(allData);
  res.send(result);
})


app.get('/assets', async(req,res)=>{
  const cursor = allDataCollection2.find()
  const results = await cursor.toArray();
  res.send(results);
})





// This portion for asset collections------------------------------------------------------














// -------------------------------Only for operations---------------------








    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Assignment 12 sever is running')

})

app.listen(port, ()=>{
    console.log(`Assignment 12 sever is running: ${port}`)
})