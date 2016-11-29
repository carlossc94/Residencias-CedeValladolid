var express = require('express');
var router = express.Router();
var passport =require('passport');
var controllers=require ('../controllers');

//middleware
var authmiddle=require('../middleware/auth');

router.get('/',controllers.HomeController.index);
//Rutas de Usuario
router.get('/auth/signup',controllers.UserController.SignUp);
router.post('/auth/signup',controllers.UserController.PostSignUp);
router.get('/auth/signin',controllers.UserController.getSignIn);

router.get('/auth/logout',controllers.UserController.logout);
router.get('/dashboard/panel', authmiddle.isLogged, controllers.UserController.getUserPanel);

//autenticacion por el metodo local, la ruta de que salga bien el autenticacion, de que salga mal y activar un messaje flash en true
router.post('/auth/signin', passport.authenticate('local',{
	successRedirect : '/dashboard/panel',
	failureRedirect: '/auth/signin',
	failureFlash: true
}));


module.exports = router;
