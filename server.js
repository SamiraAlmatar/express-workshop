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

//read from system file 
// fs.readFile(__dirname + '/data/posts.json', (error, file) =>{
//     // const pasridFile = JSON.parse(file);
//     console.log(file.toString());
// });
//handle request to create-post
app.post('/create-post', (req,res) =>{
    //hold the post to save 
    let post = req.body;
   //save the post in posts.json file 
   fs.readFile('./data/posts.json')
     .then(file => JSON.parse(file))
    //  .then(array => [...array, post]) // put the post in the array
     .then(newPost => fs.writeFile('./data/posts.json', JSON.stringify(post)))
     .then(() => res.send(200))
     .catch(err => res.send(err.toString()));
//    console.log(req.fields);
  
});
app.get('/create-post', (req,res) =>{
    fs.readFile('./data/posts.json')
    .then(posts => res.send(posts));
});

//set server port
app.listen(8080, ()=>{
    //to do once the server is running
    console.log('the server is running and use port 8080');
});