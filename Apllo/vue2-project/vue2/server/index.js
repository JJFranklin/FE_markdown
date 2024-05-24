const Article = require("./mongodb");
const express = require("express");
let app = express();

app.use(require("cors")());
app.use(express.json());

app.get("/api/articles",async (req,res)=>{
    // 向集合里面插入数据
    // Article.create({
    //     "title":"1",
    //     "content":"1234567",
    // })
    let article = await Article.find({});
    res.send(article);
});

app.listen(3002);





