'use strict';

$( document ).ready(function() {
  $.ajax({
    url: "https://galvanize-eats-api.herokuapp.com/menu",
    method: "GET",
    success: function (data){
      var menu = data.menu;
      console.log(data.menu);
      var currentItem;
      var currentItemPrice;

      (data.menu).forEach( function (data) {
        var $element = $('<p>');
        var menuArray = [];
        $element.text(data.name)
      });


      (data.menu).forEach( function (data) {
        var $element = $('<p>');
        // $element.text(data.name + "$" + data.price + "");
        $element.text(data.name);
        $( ".menuDownload" ).append($element);
      });

      function menuClick (event) {
        var currentItem = $(event.target).html();
        console.log(currentItem);

        $('.menuDownload').removeClass('highlightitem');
        $('p').removeClass('highlightitem');
        $(event.target).addClass('highlightitem');
        $('.menuDownload').removeClass('highlightitem');
        currentItem = data.name;
        currentItemPrice = data.price;
        // console.log(currentItem);
        // console.log(data.menu[3].name);
        // console.log(event.target);
      }
      $( ".menuDownload" ).on('click', menuClick);

      function addToOrder (event) {
        event.preventDefault();
        console.log(currentItem);
      }
      $('.orderButton').on('click', addToOrder);



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
