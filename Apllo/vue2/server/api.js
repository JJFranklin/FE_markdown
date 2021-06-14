const Article = require("./mongodb");
const express = require("express");
let app = express();

app.use(require("cors")());
app.use(express.json());

app.get("/api/articles",async (req,res)=>{
    let article = await Article.find();
    res.send(article);
});

app.listen(3001);





