const {faker}=require('@faker-js/faker'); // for create random data
const mysql=require('mysql2'); // for connecting to the database 
const express=require('express'); //for create local server
const methodOverride=require("method-override")


const app=express();
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))

const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))


const connection=mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database:'delta_app',
  password:'Vikash@259'
});
let  getrandomUser=()=> {
  return [ 
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}
// home route
app.get("/",(req,res)=>{
  let q= `select count(*) from user`;
  try{
    connection.query(q,(err,result)=>{
    if(err) throw err;
    let count=result[0]["count(*)"]
    res.render("home.ejs",{count})
}
)}
catch(err){
  console.log(err); 
  res.send("some error")
}
});
 
  //  show user /data

app.get("/user",(req,res)=>{
  let q=`select * from user`;


   try{
    connection.query(q,(err,result)=>{
    if(err) throw err; 
      res.render("showusers.ejs",{result})
});
}catch(err){
  console.log(err);
  res.send("some error")
}
});

// edit route
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`select * from user where id='${id}'`;
    
  try{
    connection.query(q,(err,result)=>{
    if(err) throw err; 
    let user=result[0];
      res.render("edit.ejs",{user})
});
}catch(err){
  console.log(err);
  res.send("some error")
}
})
// update route
app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password:formpass,username:newUsername}=req.body;
  
  let q=`select * from user where id='${id}'`;
    
  try{
    connection.query(q,(err,result)=>{
    if(err) throw err; 
    let user=result[0];
    if(formpass!=user.password){ 
       res.send("wrong password")
    }else{
      let q2=`update user set username='${newUsername}' where id='${id}'`;
         connection.query(q2,(err,result)=>{
          if(err) throw err; 
          res.redirect("/user")
          // res.send(result )
          
    });
}
});

}catch(err){
  console.log(err);
  res.send("some error")
}

 
});



app.listen("8080",()=>{
  console.log("server is running on port 8080");
   
})




