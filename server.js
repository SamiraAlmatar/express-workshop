const express = require("express");
//initialise the server
const app = express();

//handle request to the homepage
app.get('/', (req,res) =>{
    // console.log(req);
    res.send('Hello!, this is the homepage');
});
//handle request to json data
app.get('/api', (req,res) =>{
    res.send({hello : 'word'});
});
//handle request to html data
app.get('/html', (req,res) =>{
    res.send('<h3>Hello!, here is Html respone</h3>');
});
//handle request to date
app.get('/date', (req,res) =>{
    res.send(new Date().toDateString());
});

//set server port
app.listen(8080, ()=>{
    //to do once the server is running
    console.log('the server is running and use port 8080');
});