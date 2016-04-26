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
//console.log("test categ....", categ);
      res.view({
        categories: categ,
        testing: false,
        id: req.param('id')
      }, 'test/new/' + req.param('id'));		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
    }); //category.find end
  }, //new end

  /*
   'selfTesting': function (req, res, next) {
   console.log("selftesting ");
   console.log(req.params.all());
   console.log("-----selftesting ");
   res.view({
   ahoj: "bla"
   }, 'test/selfTesting/' + req.param('id'));		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
   }, //new end
   */
  'selfTesting': function (req, res, next) {
    console.log("selftesting ");
    console.log(req.params.all());
    console.log("-----selftesting ");
    /*res.view({
     ahoj: "bla"
     }, 'test/selfTesting/' + req.param('id'));		//ziadna funkcia po res.view sa nevykona treba mat vsetko predtym
     */

      Test.findOne({id: req.param('id')}).exec(function (err2, testCreate) {
        //
        if (err2) return next(err2);
        console.log(" Test.findOne({na....");
        var object = {};
        object.id_test = testCreate.id_user;
        if (req.param('radios') == 2) { //ak bola zvolena konkretna kategoria
          console.log("if (req.param('radios') == 2) ...");
          Pattern.find({id_category: testCreate.id_category}).exec(function (err3, patterns) { //find all patterns of category with ID = id_category
            if (err3) return next(err3);
            console.log("Pattern.find({id_category: req.param('id_category')}....");
            object.patterns = nahodnyVyber(patterns, req.param('numberofwords'));

          }); //Pattern.find  end
        } else { //zo vsetkych vyberam jeho + tie kt su publikovane = 1
          console.log("else ...");
          var id_user = testCreate.id_user;
          Pattern.query("SELECT id_category, word, word_translation, id " +
            "FROM test.pattern, (SELECT id as idC FROM test.category where id_user=" + id_user + " or (id_user <> " + id_user + " and public=1)) c " +
            "WHERE id_category = c.idC", function (err4, patterns) { //find all patterns of category with ID = id_category
            if (err4) return next(err4);
            console.log("Pattern.query(SELECT id....");
            object.patterns = patterns;
            //object.patterns = nahodnyVyber(patterns, parseInt(req.param('numberofwords')));
            req.session.flash = {
              message: true
            }
            console.log("_____________");
            console.log(object);
            //eturn res.view('/test/selfTesting', {o: object});
            //return res.redirect('test/selfTesting/' + id_user);

            /*
            res.view('test/bla',{
              o: object,
              test: false,
              a: 15
            });*/

            res.view({
              o: object,
              test: false,
              a: 15
            });


          }); //Pattern.find  end
        }
      }); //Test.findOne  end





  }, //new end


  create: function (req, res, next) {
    console.log("................................");
    console.log(req.params.all());
    var all = req.params.all();

    Test.create(req.params.all(), function categoryCreated(err, testn) {
      if (err) return next(err);
      Test.findOne({name: req.param('name')}).exec(function (err2, test) {
        req.session.flash = {
          message: true
        }
        res.redirect('/test/selfTesting/' + test.id + '/' + test.name + "/" + req.param('radios') + "/" + req.param('numberofwords'));
      });
    }); //Test.create end
  }
  , //end of create action

}
;

function nahodnyVyber(pocet, pattern) {
  if (pocet >= pattern.length) {
    for (var i = 0; i < pattern.length; i++) {
      pattern[i].answer = "";
      pattern[i].result = "";
    }
    return pattern;
  } else {
    var pole = [];
    var pozicia = [];
    var j = 0;
    while (pocet > 0) {
      var hod = Math.floor((Math.random() * pattern.length));
      if (pozicia.indexOf(hod) == -1) {
        pattern[hod].answer = "";
        pattern[hod].result = "";
        pole.push(pattern[hod]);
        pozicia.push(hod);
        pocet = pocet - 1;
      }
    }
    return pole;
  }
}

