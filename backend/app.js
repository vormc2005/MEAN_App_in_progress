const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

const Post = require('./models/post');
const { createShorthandPropertyAssignment } = require('typescript');
const app = express();
//Connection to mongo DB
mongoose.connect("mongodb+srv://user:user123@cluster0.gvrhd.mongodb.net/first-mean?retryWrites=true&w=majority").then(()=>{
    console.log('Connected to DB')
})
.catch(()=>{
    console.log("Connection failed")
})



//parsing  json
app.use(bodyParser.json())
//parsing url
app.use(bodyParser.urlencoded({extended:false}))
///Overcoming CORS error VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTION"
    );
    next()
});

// app.use((req, res, next)=>{
//     console.log('First Middleware')
//     next();
// })

            //Post Request
//install npm install --save  body parser
app.post('/api/posts', (req, res, next)=>{
    //with dummy data
    // const post = req.body;
    //with mono DB 
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    // console.log(post)
    //saving to DB
    post.save().then(createdPost=>{
    //    console.log(result) 
       res.status(201).json({
        message:'Post added successfully',
        postId: createdPost._id
    });
    })
   
    // next()
});

            //Get route can use app.use but have to keep next()
app.get('/api/posts',(req, res, next)=>{
//Get data from db
    Post.find()
    .then(documents=>{
        console.log(documents)
        res.status(200).json({
            message:'Posts fetched successfully!',
            posts:documents
        })
    })
    //Dummy data
    // const posts =[
    //     {
    //         id: "fpasodjgpa", 
    //         title: "first server side post",
    //         content: "This is coming from server"
    //     },
    //     {
    //         id: "pwoejgpo", 
    //         title: "second server side post",
    //         content: "This is coming from server!"
    //     },
    //     {
    //         id: "beorpjp", 
    //         title: "thirdserver side post",
    //         content: "This is coming from server!!"
    //     }
    // ]

    // res.status(200).json({
    //     message:'Posts fetched successfully!',
    //     posts:posts
    // })
    
})

//delete request
app.delete("/api/posts/:id", (req, res, next)=>{
    console.log(req.params.id)
    Post.deleteOne({_id: req.params.id}).then(result=>{
        console.log(result)
    })
    res.status(200).json({message:"Post deleted"});
})



module.exports = app;

