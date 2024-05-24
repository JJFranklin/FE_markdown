const mongoose = require("mongoose");

const dbUrl = "mongodb://127.0.0.1:27017/articles";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.log("err", err);
    } else {
        console.log("连接成功");
    }
})

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String
},{
    // 需要在此处指明mongodb 中创建的集合，不然就会拿不到数据，
    // 发现 mongoose.prototype.model()，会自动给 collection的 name 末尾添加 s，如果没有定义的话。 
    // 所以会导致拿到的数据为空
    collection:'Article',  
});

mongoose.model("Article", ArticleSchema);

const Article = mongoose.model("Article");

module.exports = Article;