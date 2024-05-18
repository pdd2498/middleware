const express = require("express");
const app = express();
const fs = require("node:fs")


const myMiddleware = (req , res, next)=>{


    const startTime = Date.now();
    console.log(req.url , "at" , new Date() ,req.method);

    res.on('finish', () => {
      const endTime = Date.now();
      const processingTime = endTime - startTime;
      const logEntry = `Request processed: [${new Date()}] ${req.method} ${req.url} - Processing time: ${processingTime}ms\n`;
      fs.appendFileSync("assis.log", logEntry);
      console.log(`${req.method} ${req.url} - Processing time: ${processingTime}ms`);
  });
    next()
    
}


app.use(myMiddleware);

const product  = [
  {
    id : 1,
    name : "preyesh"
  },
  {
    id : 2,
    name : "diwan"
  },
  {
    id : 3,
    name : "dhar"
  }
]

app.get("/user/app/:id" , (req , res) =>{
  console.log(req.params)
  const data = product.find(data => data.id == req.params.id)
  if(data){
    res.json({
      success: true,
      data: data,
    });
  }
    // const userData = {
    //     name: "ABC",
    //     mobileNo: "9879879879",
    //     profilePicture: "http://localhost:8080/profilepicture.jpg",
    //   };
    //   res.json({
    //     success: true,
    //     data: product,
    //   });
});

app.listen(6060 , ()=> console.log("ha bhai"));