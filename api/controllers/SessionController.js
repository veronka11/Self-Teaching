/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    /*var oldDateObj = new Date();
     var newDateObj = new Date(oldDateObj.getTime() + 60000);
     req.session.cookie.expires = newDateObj;
     req.session.authenticated = true;
     console.log(req.session);
     //console.log(new Date());

     res.view('session/new');		//zobrazenie sesion/new.ejs
     */
    res.view('session/new');
  },

  //................................................................

  create: function (req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'Enter both password and username'
      }]
      req.session.flash = {
        err: usernamePasswordRequiredError
      }
      res.redirect('/session/new');
      return;
    }

    User.findOne({email: req.param('email')}, function foundUser(err, user) {
      console.log("kontrola emailu --------------");
      if (err) return next(err);

      if (!user) {
        console.log("nespravny email -----------------")
        var noAccountError = [{name: 'noAccount', message: 'The email Adress ' + req.param('email') + ' not found.'}]
        req.session.flash = {
          err: noAccountError
        }
        res.redirect('/session/new');
        return;
      }

      //vieme ze user existuje, email tiez sedi teraz sa mrkneme na heslo
      var passwordInput = req.param('password');
      if (passwordInput != user.password) {
        console.log("nespravne password -----------------")
        var passwordError = [{name: 'noAccount', message: 'Bad passsword input'}]
        req.session.flash = {
          err: passwordError
        }
        res.redirect('/session/new');
        return;
      }

      //ak je spravne heslo aj email
      //prihlasi uzivatela
      req.session.authenticated = true;
      req.session.User = user;

      res.redirect('/user/show/' + user.id);
    }); //koniec User.findOne

  }, //koniec akcie create

  //................................................................

  destroy: function (req, res, next) {
    // Wipe out the session
    req.session.destroy();

    // Redirect the browser to the sign-in screen
    //res.redirect('/session/new');
    res.redirect('/');
  }


}
