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

  index: function (req, res, next) {
    //console.log(req.params.all());
    User.find(function foundUsers(err, users) {
      if (err) return next(err);

      res.view({
        users: users
      });
    });
  },

  'allCategories': function (req, res, next) {
    var idUserString = req.param('id');
    Category.query("SELECT category.name as nameC, public, category.id as idC, category.id_user as id_user, user.name as nameU " +
      "FROM test.category " +
      "inner join test.user on " +
      "user.id = id_user and ((id_user=" + idUserString + "))", function (err2, categories) {
      if (err2) return next(err2);

      Pattern.query("SELECT id_category AS idC, word, word_translation FROM (SELECT id FROM test.category WHERE id_user =" +
        idUserString + ") AS a, test.pattern " +
        "WHERE a.id = id_category", function (err4, patterns) {
        if (err4) return next(err4);

        User.findOne(req.param('id'), function foundUser(err3, user) {
          if (err3) return next(err3);

          //console.log(req.params.all());
          //console.log(categories);
          //console.log(patterns);
          var object = {};
          object.patterns = patterns;
          object.categories = categories;
          object.actualUser = user;

          //console.log(object);

          res.view({
            o: object
          }); //res.view  end
        }); //User.findOne  end
      }); //Pattern.query  end
    }); //Category.query  end
  },

  create: function (req, res, next) {
    User.create(req.params.all(), function userCreated(err, user) {
      //console.log(req.path);
      if (err) {
        //console.log("err  ", err);
        req.session.flash = {
          err: err
        }

        return res.redirect('/user/new');
      }
      req.session.flash = {
        message: true
      }
      res.redirect('/user/new'); //res.redirect('/user/show/' + user.id);  zrusene kvoli tomu ze je to hlavna stranka

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

      object.actualUser = user;

      var idUser = req.param('id');
      var idUserString = idUser.toString();

      //najde vsetky kategorie uzivatela + aj tie kt publikuju ostatny uzivatelia
      //Category.query("SELECT * FROM test.test inner join test.user on user.id = test.id_user and test.id_user=5")

      //QUERY - inner join + UNION + vyberanie z viacerych tabuliek
      Category.query("SELECT category.name as nameC, public, category.id as idC, category.id_user as id_user, user.name as nameU " +
        "FROM test.category " +
        "inner join test.user on " +
        "user.id = id_user and id_user=" + idUserString +
        " Union " +
        "SELECT category.name as nameC, public, category.id as idC, category.id_user as id_user, user.name as nameU " +
        "FROM test.category " +
        "inner join test.user on " +
        "user.id = id_user and ((id_user<>" + idUserString + ") and (public = 1))", function (err2, categories) {
        if (err2) return next(err2);

        object.categories = categories;

        //najde vsetky testy daneho uzivatela + jeho odpovede   pouzity inner join
        //Test.query("SELECT * FROM test.test where id_user=" + idUserString, function (err3, tests) {
        Test.query("SELECT * FROM test.test where id_user=" + idUserString, function (err3, tests) {
          if (err3) return next(err3);
          object.tests = tests;

          // SELECT id_category AS idC, word, word_translation FROM (SELECT id FROM tia.category WHERE id_user =5 OR (id_user <>5 AND public =1)) AS a, tia.pattern WHERE a.id = id_category
          Pattern.query("SELECT id_category AS idC, word, word_translation FROM (SELECT id FROM test.category WHERE id_user =" +
            idUserString + " OR (id_user <>" +
            idUserString + " AND public =1)) AS a, test.pattern " +
            "WHERE a.id = id_category", function (err4, patterns) {
            if (err4) return next(err4);
            object.patterns = patterns;

            Patterns_into_tests.query("SELECT " +
              "name, id_user, id_category, test.id as id_test, id_pattern, answer, result, patterns_into_tests.id as id_patterns_into_tests " +
              "FROM test.test " +
              "inner join test.patterns_into_tests on test.id = patterns_into_tests.id_test and test.id_user =" + idUserString, function (err5, answers) {
              if (err5) return next(err5);
              object.answers = answers;

              //console.log(object);

              if (user.typeof_user == 1) {
                res.redirect('/user');
              } else {
                res.view({o: object});
              }
            }); //Patterns_into_tests.query
          }); //pattern.query end
        }); //test.query end
      }); //category.query end
    }); //User.query end
  }
};

