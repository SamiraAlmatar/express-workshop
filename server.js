const express = require("express");
const bodyParser = require("body-parser");
const formidable = require("express-formidable");
const fs = require('fs-promise');
//initialise the server
const app = express();

//middleware to send static files
app.use(express.static('public'));

//middleware to read request body of formdata
app.use(formidable());

//handle request to create-post
app.post('/create-post', (req,res) =>{
    //hold the post to save 
    let post = req.fields;
   //save the post in posts.json file 
   fs.readFile('./data/posts.json')
     .then(file => JSON.parse(file))
    //  .then(array => post.push(array)) // put the post in the array
     .then(obj => Object.assign(obj, {
         [Date.now()]: post.blogpost
     }))
     .then(newPost => fs.writeFile('./data/posts.json', JSON.stringify(newPost)))
     .then(() => res.send(200))
     .catch(error => res.send(error.toString()));
//    console.log(req.fields);
  
});
app.get('/create-post', (req,res) =>{
    fs.readFile('./data/posts.json')
    .then(posts => res.send(posts));
});

//set server port
app.listen(8000, ()=>{
    //to do once the server is running
    console.log('the server is running and use port 8080');
});