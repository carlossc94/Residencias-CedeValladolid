var mysql=require('mysql');


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
				isAuthenticated : req.isAuthenticated(),
				user: req.user
			});
		});
	},

	getNuevaNoticia:function(req,res,next){
		res.render('dashboard/noticias',{
			title:'Subir Noticia',
			isAuthenticated : req.isAuthenticated()
		})
	}
}