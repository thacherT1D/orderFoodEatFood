'use strict';
$(document).ready(function(){
    function eventHandler(event) {
      var foodName = $('form label innerText')
      console.log(foodName);
      if($(this).is(':checked') === true){
        console.log('checked!!!');
        $( ".orderWindow" ).append();
      } else {console.log('nothing')}
      console.log()
    }
    $('form input').on('click', eventHandler);

})


$( document ).ready(function() {
  $.ajax({
    url: "https://galvanize-eats-api.herokuapp.com/menu",
    method: "GET",
    success: function (data){
      console.log(data.menu);
      var menu = data.menu;
      // console.log(data.menu.id);

      (data.menu).forEach( function (data) {
        var $element = $('<p>');
        $element.text(data.name + " ($" + data.price + ")");

        // $element.text(data.price);
        // $element.text(data.type);

        $( ".menuDownload" ).append($element);

        function menuClick (event) {
          // $( ".orderWindow" ).append();
          $( ".currentItem" ).append(data.name);
          console.log(event);
        }


        $element.on('click', menuClick);
      })
    }
  })
});

// $( document ).ready(function() {
// $.ajax({
//   method: "POST",
//   url: "https://galvanize-eats-api.herokuapp.com/orders",
//   data: { name: "Pizza", price: 10.99, type: "pizza" }
// })
//   .done(function( msg ) {
//     alert( "Data Saved: " + msg );
// });
// });
