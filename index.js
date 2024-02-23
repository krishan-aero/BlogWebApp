import express from "express";
import bodyParser from "body-parser";

const app  = express();
const port = 3000;
const blogList = [];

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", (req, res) => {
    var blog = {blogType: req.body.blogType, inputText : req.body.blog}; 
    blogList.push(blog);
    res.render("index.ejs", {blogList : blogList});
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})