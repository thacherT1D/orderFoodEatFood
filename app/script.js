'use strict';

$( document ).ready(function() {
  var currentItem;
  var currentItemPrice;
  var orderArray = [];
  var orderObject = {};
  var quanItem;
  var orderItem = {};
  var itemQuanCost;
  var itemTotal;

  $.ajax({
    url: "https://galvanize-eats-api.herokuapp.com/menu",
    method: "GET",
    success: function (data){
      var menu = data.menu;
      // console.log(data.menu);

      // var currentItem;
      // var currentItemPrice;
      // var orderArray = [];
      // var orderObject = {};
      // var quanItem;
      // var orderItem = {};
      // var itemQuanCost;
      // var itemTotal;

      (data.menu).forEach( function (data) {
        // var $element = $('<p>');
        // $('<p data-price="' + data.price + '">' + data.name + '</p>');
        var $element = $('<p data-price="' + data.price + '">' + data.name + '</p>');

        $( ".menuDownload" ).append($element.text(data.name));

      });

      function menuClick (event) {
        currentItem = $(event.target).html();
        // console.log(currentItem);
        // console.log($(event.target).data('price'));

        currentItemPrice = $(event.target).data('price');
        // console.log(currentItemPrice);

        $('.menuDownload').removeClass('highlightitem');
        $('p').removeClass('highlightitem');
        $(event.target).addClass('highlightitem');
        $('.menuDownload').removeClass('highlightitem');

      };
      $( ".menuDownload" ).on('click', menuClick);

      function addToOrder (event) {
        event.preventDefault();
        quanItem = $('#quantity')[0].value;
        // console.log(quanItem);
        // itemQuanCost = quanItem * a;
        itemTotal = currentItemPrice * quanItem;

        orderItem = {
          name: currentItem,
          quantity: quanItem,
          price: currentItemPrice,
          fullPrice: itemTotal,
        };
        // console.log(orderItem);
        orderArray.push(orderItem);
        // orderArray.push(currentItem);
        // console.log(orderArray);

        // $('#orderPreview').append(currentItem);
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(currentItem + ' (' + quanItem + ')'));
        ul.appendChild(li);

        $('p').removeClass('highlightitem');
        $('#quantity')[0].value = 1;
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

        // console.log(person);
        // console.log(orderArray);
        orderObject = {
          deliverTo: person,
          food: orderArray,
        }

//Add Form Reset
      };
      $( "#deliverItButton" ).on('click', deliverIt);

    }
  })
console.log(orderObject);

  $.ajax({
    method: "POST",
    url: "https://galvanize-eats-api.herokuapp.com/orders",
    data: {order: orderObject},
  })
    .done(function( msg ) {
      alert( "Data Saved: " + msg );
  });

});
