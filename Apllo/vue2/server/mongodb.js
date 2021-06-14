const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/articles";

mongoose.connect(dbUrl,{
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
},(err)=>{
    if(err){
        console.log("err",err);
    } else {
        console.log("连接成功");
    }
})

const ArticleSchema = new mongoose.Schema({
    title:String,
    content:String
});

mongoose.model("Article",ArticleSchema);

const Article = mongoose.model("Article");

module.exports = Article;



