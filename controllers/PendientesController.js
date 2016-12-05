var mysql=require('mysql');
var format=require('dateformat');

module.exports={
	getPendiente:function(req,res,next){
		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var pendientes=null;

		db.query('SELECT * FROM Pendientes', function(err,rows,fields){
			if(err) throw err;

			pendientes = rows;
			db.end();
			res.render('dashboard/panelpendiente', 
				{pendientes:pendientes,
				title:'Dashboard',
				isAuthenticated : req.isAuthenticated()
			});
		});
	},

	getNuevaPendiente:function(req,res,next){
		res.render('dashboard/pendientes',{
			title:'Subir pendientes',
			isAuthenticated : req.isAuthenticated()
		})
	},

	postNuevaPendiente:function(req,res,next){
		var fechaserver=new Date();
		var fecha=format(fechaserver,'yyyy-mm-dd h:MM:ss');

		var pendiente={
			Titulo: req.body.titulo,
			Cuerpo: req.body.cuerpo,
			Fecha: fecha,
			Publicado: req.user.nombre
		};

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO Pendientes SET ?', pendiente,function(err,rows,fields){
			if (err) throw err;

			db.end();
		});

		res.render('dashboard/pendientes', {
			info: 'El Pendiente se ha subido exitosamente a la base de datos',
			isAuthenticated : req.isAuthenticated()
		});
	},

	eliminarPendiente:function(req, res, next){
		var id=req.body.id;

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var respuesta={res:false};

		db.query('DELETE FROM Pendientes where ID_Pendiente=?', id, function(err, rows, fields){
			if(err) throw err;

			db.end();
			respuesta.res=true;

			res.json(respuesta);
		});
	},

	modificarPendiente:function(req,res,next){
		var id=req.params.id;

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var pendiente=null;

		db.query('SELECT * FROM Pendientes WHERE ID_Pendiente=?', id, function(err, rows,fields){
			if (err) throw err;

			pendiente=rows;

			db.end();

			res.render('dashboard/modificarpendiente', {
				title: 'Modificar Pendiente',
				pendiente:pendiente,
				isAuthenticated : req.isAuthenticated()
			});
		});
	},

	postModificarPendiente:function(req,res,next){
		var pendiente={
			Titulo: req.body.titulo,
			Cuerpo: req.body.cuerpo
		};

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		db.query('UPDATE Pendientes SET ? WHERE ?', [pendiente, {id_pendiente:req.body.id_pendiente}], function(err, rows, fields){
			if(err) throw err;

			db.end();
		});

		res.redirect('/dashboard/panel/pendiente')
	}

}
