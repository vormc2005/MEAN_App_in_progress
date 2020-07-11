const express = require('express');

const app = express();
///Overcoming CORS error VERY IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header",
    "Origin,X-Requested-With, Content_type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTION"
    );
    next()
});

// app.use((req, res, next)=>{
//     console.log('First Middleware')
//     next();
// })

app.use('/api/posts',(req, res, next)=>{
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

