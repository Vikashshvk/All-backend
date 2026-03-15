 const express=require("express")

const app=express();

let port=8081;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

app.get("/",(req,res)=>{
    res.send("you are in root path")
})
app.get("/:username/:id",(req,res)=>{
    let {username,id}=req.params;
    console.log(req.params);
    res.send(`welcome to the ${username} id with ${id}`);
}) 

app.get("/search",(req,res)=>{
    console.log(req.query)
    res.send("no result?  ")
})
