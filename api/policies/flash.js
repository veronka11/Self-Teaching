module.exports = function(req, res, next){
	
	res.locals.flash = {}; //vytvorim si prazdny objekt
	
	if(!req.session.flash) return next(); //pokial aktualny neexsituje vratime next
	
	res.locals.flash = _.clone(req.session.flash); //pokial existuje vytvorim si jeho kopiu
	
	//zmazem si data v flash
	req.session.flash = {};
	
	next();	
};