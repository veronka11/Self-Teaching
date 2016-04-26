$(document).ready(function(){

  function hiddeTr(id){
    $("#"+id).click(function(){
      $("#hide"+id).hide(1000);
    });
  }

});
