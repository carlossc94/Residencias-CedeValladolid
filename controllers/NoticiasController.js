var mysql=require('mysql');
var format=require('dateformat');

module.exports={
	getNoticias:function(req,res,next){
		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var noticias=null;

		db.query('SELECT * FROM Noticias', function(err,rows,fields){
			if(err) throw err;

			noticias = rows;
			db.end();
			res.render('dashboard/panel', 
				{noticias:noticias,
				title:'Dashboard',
				isAuthenticated : req.isAuthenticated()
			});
		});
	},

	getNuevaNoticia:function(req,res,next){
		res.render('dashboard/noticias',{
			title:'Subir Noticia',
			isAuthenticated : req.isAuthenticated()
		})
	},

	postNuevaNoticia:function(req,res,next){
		var fechaserver=new Date();
		var fecha=format(fechaserver,'yyyy-mm-dd h:MM:ss');

		var noticia={
			Titulo: req.body.titulo,
			Cuerpo: req.body.cuerpo,
			Fecha: fecha,
			Publicado: req.user.nombre
		};

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		db.query('INSERT INTO Noticias SET ?', noticia,function(err,rows,fields){
			if (err) throw err;

			db.end();
		});

		res.render('dashboard/noticias', {
			info: 'La noticia se ha subido exitosamente a la base de datos',
			isAuthenticated : req.isAuthenticated()
		});
	},

	eliminarNoticia:function(req, res, next){
		var id=req.body.id;

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var respuesta={res:false};

		db.query('DELETE FROM Noticias where ID_Noticia=?', id, function(err, rows, fields){
			if(err) throw err;

			db.end();
			respuesta.res=true;

			res.json(respuesta);
		});
	},

	modificarNoticia:function(req,res,next){
		var id=req.params.id;

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		var noticia=null;

		db.query('SELECT * FROM Noticias WHERE ID_Noticia=?', id, function(err, rows,fields){
			if (err) throw err;

			noticia=rows;

			db.end();

			res.render('dashboard/modificarnoticia', {
				title: 'Modificar Noticia',
				noticia:noticia,
				isAuthenticated : req.isAuthenticated()
			});
		});
	},

	postModificarNoticia:function(req,res,next){
		var noticia={
			Titulo: req.body.titulo,
			Cuerpo: req.body.cuerpo
		};

		var config=require('.././databases/config');
		var db=mysql.createConnection(config);
		db.connect();

		db.query('UPDATE Noticias SET ? WHERE ?', [noticia, {id_noticia:req.body.id_noticia}], function(err, rows, fields){
			if(err) throw err;

			db.end();
		});

		res.redirect('/dashboard/panel')
	}

}

//variables por post es body, variables por get es params