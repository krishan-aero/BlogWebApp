import express from "express";
import bodyParser from "body-parser";

const app  = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", (req, res) => {
    var blogText = {inputText : req.body.blog}; 
    console.log(blogText.inputText);
    res.render("index.ejs", blogText);
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})