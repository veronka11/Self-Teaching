$(document).ready(function(){

  function hiddeTr(id){
    console.log("bbbbbbbbbbbbbbb");
    $("#"+id).click(function(){
      $("#hide"+id).hide(1000);
    });
  }

});
