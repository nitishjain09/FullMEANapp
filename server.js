//import express and create express obj
const exp = require("express");
const app = exp()

const path = require('path');

//connect agular with current server
app.use(exp.static(path.join(__dirname, './dist/angularApp3/')));

//import APIs
const userApi = require('./APIs/user-api');


//import MongoCLient
const mc = require("mongodb").MongoClient;


//connection string
//const databaseUrl = "mongodb+srv://myFirstDB:nitisss@backend.zf0nd.mongodb.net/firstdb?retryWrites=true&w=majority";
const databaseUrl = "mongodb://myFirstDB:nitisss@backend-shard-00-00.zf0nd.mongodb.net:27017,backend-shard-00-01.zf0nd.mongodb.net:27017,backend-shard-00-02.zf0nd.mongodb.net:27017/firstdb?ssl=true&replicaSet=atlas-xpedn3-shard-0&authSource=admin&retryWrites=true&w=majority";

//connect to DB
mc.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err,client) => {

    if(err){
        console.log("err in db connection", err);
    }
    else{
        //get database object
        let databaseObj = client.db("firstdb");
        //create userCollection Obj
        let userCollectionObj = databaseObj.collection("userColl");
        app.set("userCollectionObj", userCollectionObj);
        console.log("connected to database");
    }
})

//execute specific api based on path
app.use("/user",userApi)

//invalid path
app.use((req,res,next) => {
    res.send({message: `path ${req.url} is invalid`});
})

//error handling middleware
app.use((err,req,res,next) => {
    res.send({message: `error is ${err.message}`});
})
 
//assign port
const port = 3000;
app.listen(port, () => console.log(`server on ${port}...`));