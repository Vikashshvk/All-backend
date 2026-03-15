const express=require("express")
const app=express();
 const path=require("path");
const port=8081;

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.get("/hello",(req,res)=>{
    res.send("Hello")
})

app.get("/rolldice",(req,res)=>{
    let dicval=Math.floor(Math.random()*7);
    res.render("rolldice.ejs",{dicval});
});

app.get("/id/:username",(req,res)=>{
    const {username}=req.params
     const instadata=require("./data.json")
     const data=instadata[username]
     console.log(data) 
    if(data){
        res.render("insta.ejs",{data});
    }else{
        res.render("error.ejs");
    }
});



app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})