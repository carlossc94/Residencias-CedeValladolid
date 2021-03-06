var express = require('express');
var router = express.Router();
var passport =require('passport');
var controllers=require ('../controllers');

//middleware
var authmiddle=require('../middleware/auth');

router.get('/',controllers.HomeController.index);
//Rutas de Usuario

router.get('/auth/signin',controllers.UserController.getSignIn);

router.get('/auth/logout',controllers.UserController.logout);

router.get('/contacto',controllers.maps.ubicacion);


//Static
router.get('/soporte',controllers.StaticController.getSoporte);
router.get('/servicios-administrativos',controllers.StaticController.getAdmin);
router.get('/infraestructura',controllers.StaticController.getInfraestructura);
router.get('/pagos',controllers.StaticController.getPagos);
router.get('/control-patrimonial',controllers.StaticController.getPatrimonial);

router.get('/dashboard/panel/noticia', authmiddle.isLogged, controllers.NoticiasController.getNoticias);
router.get('/dashboard/insertar/noticia', authmiddle.isLogged, controllers.NoticiasController.getNuevaNoticia);
router.post('/dashboard/insertar/noticia',authmiddle.isLogged,controllers.NoticiasController.postNuevaNoticia);
router.post('/dashboard/panel/noticia',authmiddle.isLogged,controllers.NoticiasController.eliminarNoticia);

router.get('/dashboard/modificar/noticia/:id',authmiddle.isLogged,controllers.NoticiasController.modificarNoticia);
router.post('/modificado/noticia',authmiddle.isLogged,controllers.NoticiasController.postModificarNoticia);

//Pendiente
router.get('/dashboard/panel/pendiente', authmiddle.isLogged, controllers.PendientesController.getPendiente);
router.get('/dashboard/insertar/pendiente', authmiddle.isLogged, controllers.PendientesController.getNuevaPendiente);
router.post('/dashboard/insertar/pendiente',authmiddle.isLogged,controllers.PendientesController.postNuevaPendiente);
router.post('/dashboard/panel/pendiente',authmiddle.isLogged,controllers.PendientesController.eliminarPendiente);
router.get('/dashboard/modificar/pendiente/:id',authmiddle.isLogged,controllers.PendientesController.modificarPendiente);
router.post('/modificado/pendiente',authmiddle.isLogged,controllers.PendientesController.postModificarPendiente);


router.get('/dashboard/insertar/usuario', authmiddle.isLogged,controllers.UserController.SignUp);
router.post('/dashboard/insertar/usuario',authmiddle.isLogged,controllers.UserController.PostSignUp);

//autenticacion por el metodo local, la ruta de que salga bien el autenticacion, de que salga mal y activar un messaje flash en true
router.post('/auth/signin', passport.authenticate('local',{
	successRedirect : '/dashboard/panel/noticia',
	failureRedirect: '/auth/signin',
	failureFlash: true
}));


module.exports = router;
