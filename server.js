var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist', ['contactlist']);
//database and collection
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public")).listen(3000); 
app.use(bodyParser.json()); //server can parse body of input it receives

app.get('/contactlist', function (req,res){
	console.log("I received a get request");

	db.contactlist.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

//listens for post request from controller
app.post('/contactlist', function (req,res){
	console.log(req.body);
	//server has to know how to parse body of input so we 'require' body parser

	//inserts code into database and sends code to controller
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc); //send back data to controller
	})
});

//static files eg HTML, CSS, JS. 
//dirname says where to look. put stuff in folder public

app.delete('/contactlist/:id', function (req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err,doc){
		res.json(doc);
	});
})

console.log("Server running on port 3000");

app.get('/contactlist/:id', function (req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err,doc){
		res.json(doc);
	});
});

//what to do when edit is called with updated contact fields
app.put('/contactlist/:id', function (req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
	});
