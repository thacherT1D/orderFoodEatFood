'use strict';

$( document ).ready(function() {
  $.ajax({
    url: "https://galvanize-eats-api.herokuapp.com/menu",
    method: "GET",
    success: function (data){
      var menu = data.menu;
      // console.log(data.menu);

      var currentItem;
      var currentItemPrice;
      var orderArray = [];
      var orderObject = {};
      var quanItem;
      var orderItem = {};
      var itemQuanCost;

      (data.menu).forEach( function (data) {
        var $element = $('<p>');
        $('<p data-price=' + data.price + '>' + data.name + '</p>');
        console.log($('<p data-price=' + data.price + '>' + data.name + '</p>'));


        
        $element.id = data.price;

        // console.log($element.text(data.name));
        // console.log(data.price);
        console.log($element.id);

        $( ".menuDownload" ).append($element.text(data.name));

      });

      function menuClick (event) {
        currentItem = $(event.target).html();
        console.log(currentItem);
        console.log($(event.target).data('price'));

        currentItemPrice = $(event.target).data('price');

        $('.menuDownload').removeClass('highlightitem');
        $('p').removeClass('highlightitem');
        $(event.target).addClass('highlightitem');
        $('.menuDownload').removeClass('highlightitem');

      };
      $( ".menuDownload" ).on('click', menuClick);

      function addToOrder (event) {
        event.preventDefault();
        quanItem = $('#quantity')[0].value;
        console.log(quanItem);
        // itemQuanCost = quanItem * a;


        orderItem = {
          name: currentItem,
          quantity: quanItem,
        };
        console.log(orderItem);
        orderArray.push(orderItem);
        // orderArray.push(currentItem);
        console.log(orderArray);

        // $('#orderPreview').append(currentItem);
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(currentItem + ' (' + quanItem + ')'));
        ul.appendChild(li);
      };
      $( ".orderButton" ).on('click', addToOrder);

      function deliverIt (event) {
        event.preventDefault();
        // console.log(event);
        var person = {
          name: $('#name')[0].value,
          emailAddress: $('#inputEmail')[0].value,
          address: $('#address')[0].value,
          phoneNumber: $('#phoneNumber')[0].value
        };

        console.log(person);
//Add Form Reset
      };
      $( "#deliverItButton" ).on('click', deliverIt);

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
