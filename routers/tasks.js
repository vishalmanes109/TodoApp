



var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");

var db = mongojs(
  "mongodb+srv://vishal:vishal@cluster0.2xsbh.mongodb.net/todo?retryWrites=true&w=majority",
  ["task"]
);

// get all task

router.get("/tasks", function (req, res, next) {
  db.task.find(function (err, tasks) {
    if (err) res.send(err);
    res.json(tasks);
  });
});

// get single task

router.get('/task/:id', function (req, res, next) {
  db.task.findOne({_id: mongojs.ObjectId(req.params.id)} ,function (err, task) {
    if (err) res.send(err);
    res.json(task);
  });
});

// save task 

router.post('/task',function(req,res,next){
  console.log('lol');
  var save_task = req.body;
  if (!save_task.title || !(save_task.isDone + '')) {
     res.status(400);
     res.json({
      error: "bad data lol",
    });
  } else {
    db.task.save(save_task,function(err,save_task){
      if(err){
        res.send(err);

      }
      res.json(save_task);
    });
  }
});


// delete tsk

router.delete("/task/:id", function (req, res, next) {
  db.task.remove({ _id: mongojs.ObjectId(req.params.id) }, function (
    err,
    task
  ) {
    if (err) res.send(err);
    res.json(task);
  });
});


//delete all atsks

router.delete("/task", function (req, res, next) {
  db.task.remove({}, function (err) {
    if (err) res.send(err);
    res.json({'sucess':true});
  });
});

// update


router.put("/tasks/:id", function (req, res, next) {
  
  var task = req.body;
  console.log(task);
  task.isDone=!task.isDone
  var updTask= {};
  console.log('checking');

  console.log(task);


  updTask.id=task._id;
  updTask.title=task.title;
  updTask.isDone=!task.isDone;
  
if(task.isDone)
updTask.isDone= task.isDone;
console.log('it is correct 1');

if(task.title)
updTask.title=task.title;
  console.log('it is correct 2');


if(!updTask){
  res.status(400);
  res.json({
    "error":"bad data lol"
  });
}
 
else {
  console.log('it is correct 3');
  db.task.save({ _id: mongojs.ObjectId(req.params.id), title:task.title , isDone: task.isDone},function (err,task) {
    if (err) res.send(err);
    res.json(task);

  });
  }
}

);




module.exports = router; 