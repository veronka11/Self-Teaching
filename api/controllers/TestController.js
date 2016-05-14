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


  'selfTesting': function (req, res, next) {
    console.log("selftesting ");
    console.log(req.params.all());
    console.log("-----selftesting ");

    Test.findOne({id: req.param('id')}).exec(function (err2, testCreate) {
      //
      if (err2) return next(err2);
      console.log(" Test.findOne({na....");
      var object = {};
      object.id_user = testCreate.id_user;
      object.id_test = req.param('id');
      object.name_test = req.param('name');
      object.count = req.param('count');

      if (testCreate.id_category != -1) { //ak bola zvolena konkretna kategoria
        console.log("if (req.param('radios') == 2) ...");
        Pattern.find({id_category: testCreate.id_category}).exec(function (err3, patterns) { //find all patterns of category with ID = id_category
            if (err3) return next(err3);
            console.log("Pattern.find({id_category: req.param('id_category')}....");
            //object.patterns = nahodnyVyber(patterns[0], req.param('numberofwords'));

            /*
             *
             */
            console.log(patterns);
            console.log(patterns.length);

            var count = req.param('count');
          var countAll = patterns.length;
            if (count < patterns.length) {
              console.log("idem robit pole.....");
              var random;
              var poleRadom = [];
              var patter = [];
              for (var i = 0; i < count; i++) {
                random = Math.floor((Math.random() * countAll));
                while (poleRadom.indexOf(random)!=-1){
                  random = Math.floor((Math.random() * countAll));
                }
                poleRadom.push(random);
                var x = patterns[random];
                x.answer = "";
                x.result = "";
                patter.push(x);
              }
              console.log(poleRadom);
              object.patterns = patter;
            }else{
              object.patterns = patterns;
            }

            //object.patterns = patterns;

            res.view({
              o: object,

            });
          }
        ); //Pattern.find  end
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

          res.view({
            o: object,
            test: false,
            a: 15
          });


        }); //Pattern.find  end
      }
    })
    ; //Test.findOne  end


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
  }, //end of create action


};


