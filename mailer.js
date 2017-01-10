var nodemailer	= require('nodemailer'),
	
 smtpConfig = { 

	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'quadcitiesair@gmail.com',
		pass: 'qcairgc2016'
	}
},

 transporter = nodemailer.createTransport(smtpConfig);

function sendMail(message, callback, shouldStringify){

 	 var element = '<p>' + message.content + '<br>' + message.email + " " + message.phone + '</p>',
 	 sender = '"' + message.name + '"' + ' '  + '<' + message.email + '>';
 	 if (shouldStringify) element = JSON.stringify(req.body);

 	 var mailOption = {
	 		
	 	from: sender,
	 	to: 'qcair@qcair.org',
	 	subject: message.subject ,
	 	text: message.email,
	 	html: element
 		
 	}

 	transporter.sendMail(mailOption, function(err, info){
 		
 		err ?( console.log(err), callback(err, false) ): (console.log( 'Message sent: ' + info.response),callback(null,true));

 	});

}

module.exports =  sendMail;

