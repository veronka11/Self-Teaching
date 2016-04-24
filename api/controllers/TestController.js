/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function (req, res) {

    Category.find({id_user: req.param('id')}, function foundCategories(err, categ) {
      if (err) return next(err);
      console.log("test categ....", categ);
      res.view({
        categories: categ,
        id : req.param('id')
      }, 'test/new/' + req.param('id'));		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym

    });

  }

};

