//we use npm init to install any project in the starting for package.json --1
//npm i use to install everything again in the system --when we have deleted the files
//npm install express -save for installing express --2
//npm i -D nodemon to add dependencies --3
// npm stands for node package manager 

const express=require ('express')
const app=express()
const path=require ('path')
const { runInNewContext } = require('vm')

const members=require('./members')

//middlewares
const middleware=(req,res,next)=>{
    console.log("hi from the middleware")
    next()      //at first the console part of middeware is displayed, after that the hello world part will be displayed
}

app.use(middleware)          //by the help of this we do not need to use middlewares in each and every files & steps
app.use(express.json())      //the data which we send by express wil be accepted

//get is used to read
//delete is used for deletion
//post is used to create
//put is used for updation

app.get("/test",middleware,(req,res)=>{
    res.end("<h1>HELLO WORLD</h1>")
})

app.get("/members",(req,res)=>{
    res.status(200).json(members)
})

app.get("/member/:id",(req,res)=>{
   // console.log("params",req.params.id)
   const found=members.some(member=>member.id===parseInt(req.params.id))   
   //console.log(found)
   if(found){
res.status(200).json({member:members.filter(member=>member.id===parseInt(req.params.id))})
   }
   else{
    res.status(400).json({msg:"no member found with the id of "+req.params.id})
   }
})

app.post("/members",(req,res)=>{       //get by default jata hai
   // console.log("hi",req.body)       //data has been sent by the body and can be fetched by the use of middleware
   const name=req.body.name
   const email=req.body.email
   const newMember={
    id:4,
    name:name,
    email:email,
    status:"active"
   }
   members.push(newMember)
   res.status(200).json({members:members})
})

app.delete("/member/:id",(req,res)=>{
   const found=members.some(member=>member.id=== parseInt(req.params.id))
   if(found){
   const result=members.filter(member=>member.id!==parseInt(req.params.id))
   res.status(200).json({members:result})
   }else{
    res.status(400).json({msg:`No member has been found with id of ${req.params.id}`})
   }
})

app.put("/member/:id",(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id))
    console.log(found)
    if(found){
members.forEach(member=>{
    if(member.id===parseInt(req.params.id)){
        member.name=req.body.name
        member.email=req.body.email
    }return res.status(200).json({msg:"Member Updated",member})
})
    }else{
        res.status(400).json({msg:`no member has been ound with the id of ${req.params.id}`})
    }
})

app.use(express.static(path.join(__dirname,'public')))

const port =3001
app.listen(port,()=>console.log(`Server is running at ${port}`))