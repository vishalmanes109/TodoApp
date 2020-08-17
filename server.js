
var  express = require('express');
 var path = require('path');
 var bodyParser = require('body-parser');

 var index= require('./routers/index');
 var tasks= require('./routers/tasks');

 var app = express();

 var port=process.env.PORT || 8080; 
 // view engine

 app.set('views', path.join(__dirname,'views'));
 app.set('view engie','ejs');
 app.engine('html',require('ejs').renderFile);

 // set static folder

 app.use(express.static(path.join(__dirname,'client')))

 //body parser mw
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));

 app.use('/',index);
 app.use('/api',tasks);

 app.listen(port,function(){
 });