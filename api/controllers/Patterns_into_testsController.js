/**
 * Patterns_into_testsController
 *
 * @description :: Server-side logic for managing patterns_into_tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res, next) {
    console.log("...........Patterns Controller...............");
    console.log(req.params.all());

    var idPattern = req.param('id_pattern');
    var answers = req.param('answer');
    var results = req.param('result');
    var idTest = req.param('id_test');

    values = [];
    for (var i = 0; i < idPattern.length; i++) {
      values.push([idTest, idPattern[i], answers[i], results[i]]);
    }

    Pattern.query("INSERT INTO patterns_into_tests (id_test,id_pattern, answer, result) VALUES ?", [values], function (err, patterns) {
      if (err) return next(err);
      req.session.flash = {
        message: true
      }
      res.redirect('/user/show/' + req.param('id_user'));
    });
  }, //end of create action

  /*
   { name_pattern: [ 'broskyňový strom', 'marhuľpvý strom' ],
   id_pattern: [ '12', '13' ],
   answer: [ 'x', 's' ],
   result: [ '0', '0' ],
   _csrf: 'CF6G4hEQ-wBKTbhxHXRsLhvaH7ltUccGqF1o',
   id_test: '94',
   id_user: '5',
   id: undefined }

   */

};

