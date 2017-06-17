var express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
// Createing the express app. In call to create the app we  need to call the express() method
var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');

console.log('about to use customer middleware')

//app.use((req,res,next) => {
//  res.render("maintenance.hbs");
//})
app.use(express.static(__dirname +"/public"))

app.use((req,res,next)=>{
  var now = new Date().toString();
  var logStatement = `${now} : ${req.method} ${req.url} ${res.body}`;
  console.log(logStatement);
  fs.appendFile('custom.log',logStatement + "\n",(error)=>{
    if(error){
      console.log(`unable to write to log file.${error}`)
    }
  })
  next();
})

console.log('used customer middleware')

hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear();
})

hbs.registerHelper("screamIt",(text,text2) =>{
  return text.toUpperCase()+text2.toLowerCase();
})

//app.get sets up the handler
app.get('/',(req,res)=>{
  //res.send('Hello World')
  res.render('home.hbs',{
    pageTitle : 'aaahhhh',
    title : 'Home Page',
    message : 'Welcome darling'
  })
})

app.get('/about',(req,res) =>{
  //res.send('About page')
  res.render('about.hbs',{
    pageTitle : 'About Page Dynamic'
  });
})

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage : 'Unable to handle the request'
  })
})
// binds the application to the port on the machine
app.listen(port, ()=>{
  console.log("Server is started on port:"+port)
})
