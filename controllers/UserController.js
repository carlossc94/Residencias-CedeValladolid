var mysql=require('mysql');
var bcrypt=require('bcryptjs');

module.exports={
	SignUp:function(req,res,next){
		return res.render('users/signup',{title:'Ingreso de Usuarios'});
	},

	PostSignUp:function(req,res,next){
		/*console.log(req.body);
		return;*/
		
		var salt=bcrypt.genSaltSync(10);
		var password=bcrypt.hashSync(req.body.pass, salt);

		var user={
			Nombre:req.body.nombre,
			Email:req.body.email,
			Password:password,
			Privilegios:"e"
		};

		var config = require('../databases/config');

		var db=mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO usuarios SET ?', user, function(err,rows,fields){
			if(err) throw err;

			db.end();
		});

		//Uso de mensajes flash
		req.flash('info','Se ha registrado correctamente ya puede iniciar sesión');
		
		return res.redirect('/auth/signin');

	},

	getSignIn: function(req,res,next){
		return res.render('users/signin',{
			title:'Iniciar Sesión',
			message:req.flash('info'),
			authmessage :req.flash('authmessage')
		});
	}, 

	logout: function(req,res,next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req,res,next){
		res.render('users/panel', {
			title:'Dashboard',
			isAuthenticated : req.isAuthenticated(),
			user: req.user
		});
	}
};