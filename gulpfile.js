var express 	= require('express'),
 	app 		= express(),
 	morgan 		= require('morgan'),
 	mongojs		= require('mongojs'), 	
 	dburl		= "localhost",
	dpres 		= mongojs(dburl, ['president']),
	dusers 		= mongojs(dburl, ['users']),
	dcontacts	= mongojs(dburl, ['contacts']),
	dcalendar	= mongojs(dburl, ['calendar']),
	bcrypt   	= require('bcryptjs'),
	bodyParser 	= require('body-parser'),
	util	 	= require('util'),
	braintree	= require('braintree'),
	port 		= 8080,
	gulp  		= require('gulp'),
	livereload  = require('gulp-livereload'),
	/* Custom Modules */

	mailer 		= require('./mailer'),

	/* Key to Access Braintree API */
	gateway = braintree.connect({
  		environment: braintree.Environment.Sandbox,
  		merchantId: "bzb26s8km9shdzbq",
  		publicKey: "hm2qy8b8c3cjvdd2", 
  		privateKey: "db4de26316d377c153e24384c676bd5d"
	});


// var gateway = braintree.connect({
//   environment: braintree.Environment.Production,
//   merchantId: "td3pg3ndnt7nz4g7",
//   publicKey: "px75h6q828cr77kk",
//   privateKey: "b3337d1f9406cab2f4841dbcc58c598a"
// });
/* Utilizing gulp for reloads when chances to scripts */
gulp.task('styles', function(){
	gulp.src('**/*.css')
		.pipe(livereload());
		console.log("styles has loaded");
});

gulp.task('structure', function(){
	gulp.src('**/*.html')
		.pipe(livereload());
		console.log('html has loaded');
});

gulp.task('behave', function(){
	gulp.src('**/*.js')
		.pipe(livereload());
		console.log("the behavior has reloaded");
});

gulp.task('watch', function(){
	livereload.listen();
	gulp.watch('**/*.js');
	gulp.watch('**/*.css');
	gulp.watch('**/*.html');
});

gulp.task('default', ['styles', 'structure', 'behave','watch']);



/*Checking Database Connection */
dpres.on('error', (err)=>{
	console.log('database error', err)
});

dpres.on('connect', ()=>{
	console.log('database connected, collection pres established')
});

/*The Start of All of App chaining */

//.static is a middleware function that simply grabs all the static files from the specified directory
app.use(express.static(__dirname + '/qcair'))


.listen(process.env.PORT || port, ()=>{

	console.log('Your server is up and running on ' + port);
});

app.use(bodyParser.urlencoded({
	extended: true
}))

.use(bodyParser.json())

/* log http request to console */
.use(morgan('dev'));

app.post('/mail', (req, res)=>{

	console.log(req.body);

	// mailer(req.body, (err, wasSent)=>{
	// 	 res.send(wasSent);
	// });

});

app.get('/pres', function(req, res){

 	dpres.president.find((err, data)=>{
 		res.json(data);
 	});

 });

app.put('/pres/:id', (req, res)=>{
	//President is rewriting is own password and username to pass baton
	/*generating salt and specifying iterations for password hashing */	
	bcrypt.genSalt(12, (err, salt)=>{
		/* Hashes Password then connecting it to salt */
		bcrypt.hash(req.body.password, salt, (err, hash)=>{
			/* Editing Existing Presidents Info */
			dpres.president.findAndModify({
				query: {_id: mongojs.ObjectId(req.params.id)},
				update: {$set: {username: req.body.username, password: hash}}, 
				new: true
			}, (err, doc)=>{
				res.json(doc);
			});
		
		});

	});

});

app.post('/admin', (req, res)=>{
	/*generating salt an specifying iterations for password hashing */
	bcrypt.genSalt(12, (err, salt)=>{
		/*Hashs Password connecting it to salt */
		bcrypt.hash(req.body.pass, salt, function(err, hash){
			/*Adding to database */
			dusers.users.insert({user : req.body.user, pass: hash}, (err, data)=>{
				err ? console.log(err) : res.json(data);
			});
		});
	});
});

app.get('/admin', (req, res)=>{

	dusers.users.find( (err, data)=>{
		//Grabbing All Admins
		err ? console.log(err) : res.json(data);

	});

});

app.delete('/admin/:id', (req, res)=>{
		
	dusers.users.remove({_id:mongojs.ObjectId(req.params.id)}, (err, data)=>{
		//Removing an Admin
		res.json(data);
	});
});

app.get('/admin/:id', (req, res)=>{
	
	dusers.users.findOne({_id:mongojs.ObjectId(req.params.id)}, (err, doc)=>{
		
		res.json(doc);
	});	
});

app.put('/admin/:id', (req, res)=>{
	
	bcrypt.genSalt(12, (err, salt)=>{
		
		bcrypt.hash(req.body.pass, salt, (err, hash)=>{
			
			dusers.users.findAndModify({
				query: {_id: mongojs.ObjectId( req.params.id )},
				update: {$set: {user: req.body.user, pass: hash}}, 
				new: true
			}, (err, doc)=>{
				res.json(doc);
			});

		});
	});

});

app.get('/contact', (req, res)=>{
	
	dcontacts.contacts.find((err, data)=>{
		
		res.json(data);

	});
});

app.post('/contact', (req, res)=>{

	dcontacts.contacts.insert(req.body, (err, data)=>{
		
		err ? console.log(err) : res.json(data);

	});

});

app.delete('/contact/:id', (req, res)=>{
	
	dcontacts.contacts.remove({_id: mongojs.ObjectId(req.params.id)}, (err, data)=>{
	
		err ? console.log(err) : res.json(data);
	
	})
});

app.get('/contact/:id', (req, res)=>{
	
	dcontacts.contacts.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, data)=>{
	
		err ? console.log(err) : res.json(data);
	
	});
});

app.put('/contact/:id', (req, res)=>{
	//The President edits the existing contacts here

	dcontacts.contacts.findAndModify({
		query:{_id: mongojs.ObjectId(req.params.id)},
		update: {
			$set: { 
				
				name: req.body.name, 
				number: req.body.number, 
				email: req.body.email, 
				address: req.body.address
			}
		},
		new: true
	}, (err, data)=>{
		res.json(data);
	});
});

app.put('/login', (req, res)=>{
	//queries against dusers collection to see if user exist
	dusers.users.findOne({user: req.body.user}, (err, data)=>{
		//if duser doesnt return anything check if info is presidents
		if(!data){
		    
			dpres.president.findOne({username: req.body.user}, (err, docs)=>{
			     //if neither president nor users possessed info 	
				if(!docs){
					res.send(false);
					return;
				} 
				//compare info to stored hash
				bcrypt.compare(req.body.password, docs.password, (err, result)=>{
						result === true ? res.send('president') : res.send(false);
				});
	
			});

			return;
		}
		//we compare user the password to the stored hash
		bcrypt.compare(req.body.password, data.pass, (err, isCorrectInfo)=>{
			res.send(isCorrectInfo);
		});
		
	});
});

app.get('/events', (req, res)=>{
	dcalendar.calendar.find((err, data)=>{
		res.json(data);
	});
});

app.post('/events', (req, res)=>{
	
	dcalendar.calendar.insert(req.body, (err, docs)=>{
		err ? console.log(err) : res.json(docs);
	
	});
});

app.get('/events/:id', (req, res)=>{
	
	dcalendar.calendar.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, data)=>{
		err ? console.log(err) : res.json(data);
	});
});

app.delete('/events/:id', (req, res)=>{
	
	dcalendar.calendar.remove({_id: mongojs.ObjectId(req.params.id)}, (err, docs)=>{
		err ? console.log(err) : res.json(docs);
	});
});

app.put('/events/:id', (req, res)=>{
	
	dcalendar.calendar.findAndModify({
		query: {_id: mongojs.ObjectId(req.params.id)},
		update: {$set: {name: req.body.name , place: req.body.place, date: req.body.date}},
		new: true
	}, (err, data)=>{
		err ? console.log(err) : res.json(data);
	});
});

app.get("/clientToken", (req, res)=> {
  gateway.clientToken.generate({}, (err, response)=> {
  	res.send( response.clientToken);
  });
});



app.post("/checkout", (req, res)=> {

  var amount = req.body.amount,
	  nonceFromTheClient = req.body.payment_method_nonce;

  // Use payment method nonce here
  gateway.transaction.sale({
		amount: req.body.amount,
		paymentMethodNonce: nonceFromTheClient,
	  	options: {
	    	submitForSettlement: true
	  	}
	}, (err, result) => {
		//transaction failed to 'attempt' to process---recieved no respone from api
		if(!result.transaction ){

			res.redirect("/#/processRed");
		}else{
			//if we're here it means trasaction attempted
			req.body.subject = "Donation";
			req.body.email = "Donation Information";

			mailer(req.body, (err, wasSent)=>{
				err ? res.send(false) 
				    : ( //if transaction was a success GREEN if not RED
				    	result.transaction.satus == 'submitted_for_settlement' ? res.redirect('/#/processGreen') 
				    	: res.redirect('/#/processRed') 

				     );

			}, true);
			
		}
	});
});




