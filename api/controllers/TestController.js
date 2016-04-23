/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function (req, res) {
    res.view('test/new');		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
  }

};

