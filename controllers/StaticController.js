module.exports={
	getSoporte:function(req,res,next){
		
		res.render('static/soporte', {
			title:'Soporte Técnico'
		});
	},
	getAdmin:function(req,res,next){
		
		res.render('static/administrativos', {
			title:'Servicios Administrativos'
		});
	},
	getInfraestructura:function(req,res,next){
		
		res.render('static/infraestructura', {
			title:'Infraestructura'
		});
	},
	getPagos:function(req,res,next){
		
		res.render('static/pagos', {
			title:'Pagos'
		});
	},
	getPatrimonial:function(req,res,next){
		
		res.render('static/patrimonial', {
			title:'Control Patrimonial'
		});
	}
}