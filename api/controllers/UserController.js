/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view();		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
  },
  /*'signIn': function (req, res) {
   res.view();		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
   },*/
  index: function (req, res, next) {
    //console.log(new Date());
    //console.log(req.session.authenticated);

    User.find(function foundUsers(err, users) {
      if (err) return next(err);

      res.view({
        users: users
      });
    });
  },
  create: function (req, res, next) {
    //console.log("path  ");
    //var slug = req.param('slug');
    //create a User with the params sent from
    //the sign-up form --> new.ejs
    User.create(req.params.all(), function userCreated(err, user) {
      //console.log(req.path);
      if (err) {
        //console.log("err  ", err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/user/new');
      }

      //res.json(user); //nahradene za ukadanie user.id

      //user.typeof_user = 5;
      console.log(user);
      console.log(JSON.stringify(user));

      //res.redirect('/user/show/' + user.id);
      req.session.flash = {
        message: true
      }
      res.redirect('/user/new');

    });
  },


  destroy: function (req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/user');

    });
  },

  //skenuje view (/views/show.ejs)
  //console.log(req.params);
  //console.log(req.params['id']);
  show: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      console.log("show", user);
      res.view({
        user: user
      });
    });
  }


};

