/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new' : function(req, res){
		res.view();		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
	},
  'signIn' : function(req, res){
    res.view();		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
  },
	create: function (req, res, next){
		//create a User with the params sent from
		//the sign-up form --> new.ejs
		User.create(req.params.all(), function userCreated(err, user){
			if (err) {
				//console.log(err);
				req.session.flash = {
					err : err
				}
				//if error redirect back to sign-up page
				return res.redirect('/user/new');
			}

			//res.json(user); //nahradene za ukadanie user.id


      console.log(user);
      console.log( JSON.stringify(user));

			res.redirect('/user/show/'+user.id);
		});
	},

	//skenuje view (/views/show.ejs)
	//console.log(req.params);
	//console.log(req.params['id']);
	show: function(req, res, next){
		User.findOne(req.param('id'), function foundUser(err, user){
			if (err) return next(err);
			if (!user) return next();
      console.log("show",user);
			res.view({
				user: user
			});
		});


	}

};

