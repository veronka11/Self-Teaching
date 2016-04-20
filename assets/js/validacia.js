$(document).ready(function(){
	
	//validacia spravneho formulara
	//pomocne kniznice jquery.validate
	
	$('#formular').validate({
		rules: {
			name: {
				required:true
			},
			email:{
				required:true,
				email: true
			},
			password:{
				minlength: 6,
				required: true
			}
		},
		success: function(element){
			element.text('OK').addClass('valid')
		}
	});
});