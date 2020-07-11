const express = require('express');
const bodyParser = require("body-parser")
const app = express();

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
    const post = req.body;
    console.log(post)
    res.status(201).json({
        message:'Post added successfully'
    });
    // next()
});

            //Get route can use app.use but have to keep next()
app.get('/api/posts',(req, res, next)=>{
    const posts =[
        {
            id: "fpasodjgpa", 
            title: "first server side post",
            content: "This is coming from server"
        },
        {
            id: "pwoejgpo", 
            title: "second server side post",
            content: "This is coming from server!"
        },
        {
            id: "beorpjp", 
            title: "thirdserver side post",
            content: "This is coming from server!!"
        }
    ]

    res.status(200).json({
        message:'Posts fetched successfully!',
        posts:posts
    })
    
})



module.exports = app;

