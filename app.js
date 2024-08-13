import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";

import conn from './db.js';

conn();


const app = express();
const port = 3000; 
// ejs
app.set("view engine","ejs");
//static files middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/",pageRoute);
app.use("/about.html",pageRoute);
app.use("/photos",photoRoute);
app.use("/users",userRoute);
/* app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/about.html",(req,res)=>{
    res.render("about");
}); */


app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
  });