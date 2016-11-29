var LocalStrategy=require('passport-local').Strategy;
var mysql=require('mysql');
var bcrypt=require('bcryptjs');

module.exports = function(passport){
	//Serializar convierte objeto a string
 	passport.serializeUser(function(user,done){
 		done(null,user);
 	});
 	//deserializar convierte el estring de nuevo a objeto
 	passport.deserializeUser(function(obj, done){
 		done(null,obj);
 	});

 	//uso del passport local, parametros json y funcion
 	passport.use(new LocalStrategy({
 		passReqToCallback:true
 	},
 	function(req, email, password, done){
 		var config=require('.././databases/config');

 		var db=mysql.createConnection(config);

 		db.connect();

 		db.query('SELECT * FROM users WHERE Email = ?',email,function(err, rows, fields){
 			if(err) throw err;

 			db.end();

 			if(rows.length>0){
 				var user = rows[0];
 				if(bcrypt.compareSync(password, user.Password)){
 					return done (null,{
 						id: user.ID_User,
 						nombre: user.Nombre,
 						email: user.Email
 					});
 				}
 			}
 			return done(null, false, req.flash('authmessage', 'Email o Password Incorrectos'));
 		});
 	}
 	));
 };