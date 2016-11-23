var express = require('express');
var router = express.Router();
var passport =require('passport');
var controllers=require ('../controllers');

router.get('/',controllers.HomeController.index);
//Rutas de Usuario
router.get('/auth/signup',controllers.UserController.SignUp);
router.post('/auth/signup',controllers.UserController.PostSignUp);
router.get('/auth/signin',controllers.UserController.getSignIn);

//autenticacion por el metodo local, la ruta de que salga bien el autenticacion, de que salga mal y activar un messaje flash en true
router.post('/auth/signin', passport.authenticate('local',{
	successRedirect : '/',
	failureRedirect: '/auth/signin',
	failureFlash: true
}));
module.exports = router;
