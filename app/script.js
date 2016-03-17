'use strict';

$( document ).ready(function() {
  $.ajax({
    url: "https://galvanize-eats-api.herokuapp.com/menu",
    method: "GET",
    success: function (data){
      var menu = data.menu;
      console.log(data.menu);
      var list = JSON.stringify(menu);
      console.log(list);

      var currentItem;
      var currentItemPrice;
      var orderArray = [];
      var menuObject = {};

      // (data.menu).forEach( function (data) {
      //   var $element = $('<p>');
      //   menuObject['name']= (data.name);
      //   console.log(menuObject);
      // });

      (data.menu).forEach( function (data) {
        var $element = $('<p>');
        // $element.text(data.name + "$" + data.price + "");
        $element.text(data.name);
        $( ".menuDownload" ).append($element);
      });

      function menuClick (event) {
        var currentItem = $(event.target).html();
        orderArray.push(currentItem);
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
      };
      $( ".menuDownload" ).on('click', menuClick);

      function addToOrder (event) {
      event.preventDefault();
//       var orderWindow = document.getElementById('orderWindow');
//       var element = document.createElement('p');
// element.html('hello');
//       orderWindow.appendChild(element);

      $('.orderWindow').append(orderArray);
      // console.log(orderArray);
      orderArray = [];
      };
      $( ".orderButton" ).on('click', addToOrder);

      // $('.orderButton').click(function(event){
      //   event.preventDefault();
      //   $('.orderWindow').append(orderArray);
      //   console.log(orderArray);
      //   orderArray = [];
      // });


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
