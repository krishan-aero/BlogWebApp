import express from "express";
import bodyParser from "body-parser";

const app  = express();
const port = 3000;
var blogList = [];
var blogListEdit = [];
var blogCount = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/refresh", (req, res) => {
    if (blogCount > 0){
        blogCount = 0;
        blogList = [];
    }
    res.redirect("/");
})

app.post("/submit", (req, res) => {
    console.log("submit is hit")
    blogCount++;
    var blog = {id: blogCount, blogType: req.body.blogType, inputText : req.body.blog}; 
    blogList.push(blog);
    console.log(blogList);
    res.render("index.ejs", {blogList : blogList});
})

app.post("/delete", (req, res) => {
    blogList = blogList.filter(item => (item.id).toString() !== req.body.blogID);
    res.render("index.ejs", {blogList: blogList}); 
})

app.post("/edit", (req, res) => {
    console.log("In edit", blogList);
    blogListEdit = blogList.filter(item => (item.id).toString() == req.body.blogID)[0];
    console.log(blogListEdit);
    res.render("index.ejs", {blogListEdit}); 
})

app.post("/resubmit", (req, res) => {
    console.log(" resubmit", blogList);
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})