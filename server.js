const express = require('express')                            //import express framwork
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')                            // import mongobd database
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/articleDatabase')        //Connecting the localhost with the database

app.set('view engine','ejs')        //view engine converts ejs files to html
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req,res)=>{
    const articles = await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)

app.listen(3000)
