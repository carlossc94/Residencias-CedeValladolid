var mysql=require('mysql');
var bcrypt=require('bcryptjs');

module.exports={
	SignUp:function(req,res,next){
		return res.render('users/signup',{
			title:'Ingreso de Usuarios',
			message:req.flash('info'),
			isAuthenticated : req.isAuthenticated()
		});
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
			Departamento:req.body.departamento,
			Privilegios:"e"
		};

		var config = require('../databases/config');

		var db=mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO users SET ?', user, function(err,rows,fields){
			if(err) throw err;

			db.end();
		});

		//Uso de mensajes flash
		req.flash('info','Usuario registrado correctamente '+user.Nombre+' ya puede iniciar sesión');
		
		return res.redirect('/dashboard/insertar/usuario');

	},

	getSignIn: function(req,res,next){
		return res.render('users/signin',{
			title:'Iniciar Sesión',
			authmessage :req.flash('authmessage')
		});
	}, 

	logout: function(req,res,next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req,res,next){
		res.render('dashboard/panel', {
			title:'Dashboard',
			isAuthenticated : req.isAuthenticated(),
			user: req.user
		});
	}
};