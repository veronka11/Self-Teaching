/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res) {
    res.view('category/new');		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
  }


}

