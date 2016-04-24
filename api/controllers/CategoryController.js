/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function (req, res, next) {
    console.log(req.params.all());
    console.log("+++");
    /*User.findOneById(req.param('id')).exec(function(err, user){
     console.log("user  ",user);
     //res.view({ user: user });
     });*/
    res.view({id: req.param('id')}, 'category/new');		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
  },


  create: function (req, res, next) {
    var nameN = req.param('name');
    console.log(nameN);

    var newCategory = {};
    newCategory.name = req.param('name');
    newCategory.public = req.param('public');
    newCategory.id_user = parseInt(req.param('id_user'));
    console.log("newCategory  ", newCategory);
    //req.params.all()
    Category.create(newCategory, function categoryCreated(err, categor) {
      console.log("req.params.all()________ ", req.params.all());
      if (err) {
        req.session.flash = {
          err: err
        }
        return res.redirect('/category/new');
      }

      Category.findOne({name: req.param('name')}).exec(function (err2, categor1) {
        if (err2) {
          req.session.flash = {
            err: err2
          }
          return res.redirect('/category/new');
        }

        /*
         var employee = { name: 'Winnie', location: 'Australia' };
         con.query('INSERT INTO employees SET ?', employee, function(err,res){
         if(err) throw err;

         console.log('Last insert ID:', res.insertId);
         });
         */
        var word = req.param('word');
        var translation = req.param('word_translation');
        var id = categor1.id;
        console.log("word, word_translation, id", word, ", ", translation, ", ", id);
        var values = [];
        if (typeof (word) == "string") { //mam len 1 slovo+preklad
          //values.push({id_category: id, word: word, word_translation: translation});
          values.push([id, word, translation]);
        } else {
          for (var i = 0; i < word.length; i++) {
            //values.push({id_category: id, word: word[i], word_translation: translation[i]});
            values.push([id, word[i], translation[i]]);
          }
        }
        console.log("values  ", values);
        //Pattern.query("INSERT INTO test.pattern SET ?", values, function (err3, patterns) {
        Pattern.query("INSERT INTO pattern (id_category, word, word_translation) VALUES ?", [values], function (err3, patterns) {
          if (err3) return next(err3);
          console.log("...patterns INSERT  ", patterns);
          console.log("...categor  ", categor1);

          req.session.flash = {
            message: true
          }
          res.redirect('/category/new/' + id.toString());

        }); //pattern.query end
      }); // Category.findOne end
    }); // Category.create end
  }, //end of create action


  'edit': function (req, res, next) {
    console.log('req....', req.params.all());
    console.log('som v edit');


    Category.findOne(req.param('id'), function foundCategory(err2, editCategory) {
      if (err2) return next(err2);
      if (!editCategory) return next();

      var idCategory = req.param('id');
      var idCategoryString = idCategory.toString();

      Pattern.query("SELECT id_category, word, word_translation, id FROM test.pattern WHERE id_category =" + idCategoryString, function (err3, patterns) {
        if (err3) return next(err3);
        console.log("...patterns ", patterns);
        console.log('categor....', editCategory);
        
        req.session.flash = {
          message: true
        }
        res.view({
          categories: editCategory,
          pattern: patterns
        });

      }); //pattern.query end


    }); //Category.findOne end

  } //edit end

}

