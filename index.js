import express from 'express'
import path from 'path'
import { MongoClient,ObjectId } from 'mongodb';

const app=express();
const publicpath=path.resolve('public')
app.use(express.static(publicpath))
app.set('view engine','ejs')

// Databse
const dbName='Node-project';
const collectionName="todo"
const url = "mongodb://127.0.0.1:27017";

const client=new MongoClient(url)

const connection= async()=>{
    const connect= await client.connect();
    return await connect.db(dbName)
}
app.use(express.urlencoded({extended:false}))
app.get('/',async(req,res)=>{
    const db=await connection();
    const collection=db.collection(collectionName);
    const result= await collection.find().toArray()
    res.render("list",{result})
})
app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/update',(req,res)=>{
    res.render("update")
})
app.post('/update',(req,res)=>{
    res.redirect("/")
})
app.post('/add',async(req,res)=>{
    const db= await connection();
    const collection = db.collection(collectionName)
const result = await collection.insertOne(req.body);

    if(result){
    res.redirect("/")
    }
    else{
        res.redirect('/add')
    }
})

app.get('/delete',async(req,res)=>{
    const db=await connection();
    const collection=db.collection(collectionName);
    const result= await collection.find().toArray()
    console.log(result)
    res.render("list",{result})
})
app.get('/delete/:id',async(req,res)=>{
    const db= await connection();
    const collection = db.collection(collectionName)
const result = await collection.deleteOne({_id:new Object(req.params)});

    if(result){
    res.redirect("/")
    }
    else{
        res.send('/Some Error')
    }
})
app.get('/update/:id',async(req,res)=>{
    const db= await connection();
    const collection = db.collection(collectionName)
const result = await collection.findOne({_id:new Object(req.params)});

    if(result){
    res.redirect("/update",{result})
    }
    else{
        res.send('Some Error')
    }
    
})


app.post('/update/:id',async(req,res)=>{
    const db= await connection();
    const collection = db.collection(collectionName)
    const filter="{_id:new ObjectId(req.params._id)}";
    const updateDate={$set:{title:req.body.title,description:req.body.description}}
const result = await collection.updateOne(filter,updateDate);

    if(result){
    res.redirect("/")
    }
    else{
        res.send('Some Error')
    }
    
})


app.post('/multi-delete',async(req,res)=>{
    const db= await connection();
    const collection = db.collection(collectionName)
  console.log(req.body.selectedtask)
  let selectedtask=undefined
  if(Array.isArray(req.body.selectedtask)){
    selectedtask=req.body.selectedtask.map((id)=>new ObjectId(id))
  }
  else{
     selectedtask=[new ObjectId(req.body.selectedtask)]
  }
 
   
const result = await collection.deleteMany({_id:{$in:selectedtask}});

    if(result){
    res.redirect("/")
    }
    else{
        res.send('Some Error')
    }
    
})

app.listen(3200)