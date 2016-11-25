

module.exports={
	index:function(req,res,next){
		
		res.render('home', {
			title:'Cede Valladolid',
			isAuthenticated : req.isAuthenticated(),
			user: req.user
		});
	}
}