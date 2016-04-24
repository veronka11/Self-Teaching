$(document).ready(function () {

  //validacia spravneho formulara
  //pomocne kniznice jquery.validate

  $('#formular').validate({
    rules: {
      name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      password: {
        minlength: 6,
        required: true
      }
    },
    success: function (element) {
      element.text('OK').addClass('valid')
    }
  });

  $('#formularCategory').validate({
    rules: {
      name: {
        required: true,
        minlength: 4
      },
      word: {
        required: true,
        minlength: 4
      },
      word_translation: {
        minlength: 4,
        required: true
      }
    },
    success: function (element) {
      element.text('OK').addClass('valid')
    }
  });

});
