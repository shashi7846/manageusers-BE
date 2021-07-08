const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("mongodb");
const DB ="Paripoornatask"

app.use(express.json());
app.use(cors())


const URL="mongodb+srv://shashi:shashi123@cluster0.lo5wh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const port = process.env.PORT|| 3000;

app.post("/user", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
      
        let uniqueEmail = await db.collection("users").findOne({ email: req.body.email });
        
        if (uniqueEmail) {
            res.status(401).json({
                message: "email already exist"
            })
        } else {
          

            let users = await db.collection("users").insertOne(req.body);

            await connection.close();
            res.json({
                message: "User Registerd"
            })
        }
    } catch (error) {
        console.log(error)
    }
})


app.get("/user", async function (req, res) {
    try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let users = await db.collection("users").find().toArray();
      await connection.close();
      res.json(users);
    } catch (error) {
      console.log(erroe);
    } 
  });

  app.get("/user/:id", async function (req, res) {
    try {
      let connection = await mongodb.connect(URL);
      let db = connection.db(DB);
      let user = await db.collection("users").findOne({ _id: mongodb.ObjectID(req.params.id) });
      await connection.close();
      res.json(user);
    } catch (error) {
      console.log(error);
    } 
  });

  app.delete("/user/:id", async function (req, res) {
    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        
        await db.collection("users").deleteOne({ _id: mongodb.ObjectID(req.params.id)})
        await connection.close()
        res.json({
            message: "Deleted"
        })
    } catch (error) {
        console.log(error)
    }
})

//updating the user by id
app.put("/user/:id", async function (req, res) {

    try {
        let connection = await mongodb.connect(URL);
        let db = connection.db(DB);
        await db.collection("users").updateOne({ _id: mongodb.ObjectID(req.params.id) }, { $set: req.body })
        res.json({
            message: "Updated"
        })
        await connection.close();
    } catch (error) {
        console.log(error)
    }

})

app.get("/",(req,res)=>res.status(200).send("hello shashi"));
 

app.listen(port,()=>console.log(`it is listining on ${port}`));

