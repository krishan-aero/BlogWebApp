import express from "express";
import bodyParser from "body-parser";

const app  = express();
const port = 3000;
var blogList = [];
var blogListEdit = [];
var blogCount = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Home page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// got to home screen from any route
app.get("/refresh", (req, res) => {
    if (blogCount > 0){
        blogCount = 0;
        blogList = [];
    }
    res.redirect("/");
})

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {blogList : blogList});
});

// Submit the blog
app.post("/submit", (req, res) => {
    console.log("submit is hit")
    blogCount++;
    var blog = {id: blogCount, blogType: req.body.blogType, inputText : req.body.blog}; 
    blogList.unshift(blog);
    console.log(blogList);
    res.render("index.ejs");
})

// delete the blog
app.post("/delete", (req, res) => {
    blogList = blogList.filter(item => (item.id).toString() !== req.body.blogID);
    res.render("blogs.ejs", {blogList: blogList}); 
})

// Create a space to edit blog
app.post("/edit", (req, res) => {
    console.log("In edit", blogList);
    blogListEdit = blogList.filter(item => (item.id).toString() == req.body.blogID)[0];
    console.log(blogListEdit);
    res.render("blogs.ejs", {blogListEdit}); 
})

// ReSubmit the editted blog.
app.post("/resubmit", (req, res) => {
    console.log(" resubmit", req.body);
    var blogEdited = [{id: req.body.blogID, blogType: req.body.blogType, inputText : req.body.blog}];
    const i = blogList.findIndex(x => x.id == blogEdited.id)
    blogList = blogList.map(x => blogEdited.find(({ id }) => id == x.id) || x)
    res.render("blogs.ejs", {blogList : blogList});
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})