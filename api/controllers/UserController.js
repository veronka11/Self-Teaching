/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new' : function(req, res){
		//res.locals.flash = _.clone(req.session.flash); //chybu bralo len raz
		//req.session.flash = {}; //zmazanie povodnej chyby pri refreshe sa nesmie uy chyba zobrazit ale len formular
		res.view();		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
		//req.session.flash = {}; //nemoze byt tu nefunguju funkcie za vypraznenie chyby pred treba	
	},
	
	create: function (req, res, next){
		//create a User with the params sent from
		//the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){
			//if there an error 
			//chyba ak nezlvozim informacie do formulara aby nepadol na error 404 ci inej
			//chybu si ulozim a pri dalsom refreshe aby ju stale nebralo do uvahy res.locals.flash = _.clone(req.session.flash);
			//aby cakalo na pripadnu inu dalsiu chybu
			if (err) {
				console.log(err);
				req.session.flash = {
					err : err
				}				
				//if error redirect back to sign-up page
				return res.redirect('/user/new');
			}			
			//After successfully creating the user
			//redirect to the slow action
			res.json(user);
			//req.session.flash = {};
		});		
	}
	
};

