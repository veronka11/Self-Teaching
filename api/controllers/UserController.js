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

  //vyberanie dat z tabulky user, category
  show: function (req, res, next) {
    var object = {};
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();
      console.log("show", user);
      object.actualUser = req.param('id');
      object.userN = user;

      /* Category.find({id_user2: req.param('id')}, {select: [name, id]}, function foundCategories(err2, categories) {
       if (err2) return next(err2);
       object.categories = categories;
       res.view(object);
       });*/
      var idUser = req.param('id');
      var idUserString = idUser.toString();

      //najde vsetky kategorie uzivatela + aj tie kt publikuju ostatny uzivatelia
      Category.query("SELECT * FROM test.category where id_user=" + idUserString + " or (id_user <> " + idUserString + " and public=1)", function (err2, categories) {
        if (err2) return next(err2);
        object.categories = categories;
        //najde vsetky testy daneho uzivatela

        Category.query("SELECT * FROM test.test where id_user=" + idUserString, function (err3, tests) {
          if (err3) return next(err3);
          console.log("tests  ", tests);
          object.tests = tests;
          console.log(object);
          res.view({o: object});
        });

        //res.view(object);
      });


      /*
       res.view({
       user: user
       });
       */

    });


  }


};

