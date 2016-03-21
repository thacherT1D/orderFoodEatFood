$(document).ready(function() {
  'use strict';
  var currentItem;
  var currentItemPrice;
  var orderArray = [];
  var orderObject = {};
  var quanItem;
  var orderItem = {};
  var itemTotal;

  $.ajax({
    url: 'https://galvanize-eats-api.herokuapp.com/menu',
    method: 'GET',
    success: function(data) {
      var menu = data.menu;

      menu.forEach(function(data) {
        var $element = $('<p data-price="' + data.price + '">' + data.name + '</p>');

        $('.menuDownload').append($element.text(data.name));
      });

      function menuClick(event) {
        currentItem = $(event.target).html();
        currentItemPrice = $(event.target).data('price');
        $('.menuDownload').removeClass('highlightitem');
        $('p').removeClass('highlightitem');
        $(event.target).addClass('highlightitem');
        $('.menuDownload').removeClass('highlightitem');
      }
      $('.menuDownload').on('click', menuClick);

      function addToOrder(event) {
        event.preventDefault();
        quanItem = $('#quantity')[0].value;
        itemTotal = currentItemPrice * quanItem;
        orderItem = {
          name: currentItem,
          quantity: quanItem,
          price: currentItemPrice,
          fullPrice: itemTotal
        };
        orderArray.push(orderItem);
        var ul = document.getElementById('list');
        var li = document.createElement('li');

        li.appendChild(document.createTextNode(currentItem + ' (' + quanItem + ')'));
        ul.appendChild(li);
        $('p').removeClass('highlightitem');
        $('#quantity')[0].value = 1;
      }
      $('.orderButton').on('click', addToOrder);
      function deliverIt(event) {
        event.preventDefault();
        var person = {
          name: $('#name')[0].value,
          emailAddress: $('#inputEmail')[0].value,
          address: $('#address')[0].value,
          phoneNumber: $('#phoneNumber')[0].value
        };
        orderObject = {
          deliverTo: person,
          food: orderArray
        };
        $.ajax({
          method: 'POST',
          url: 'https://galvanize-eats-api.herokuapp.com/orders',
          data: { order: orderObject },
        })
          .done(function(msg) {
            alert('Data Saved:' + msg);
          });
      }
      $('#deliverItButton').on('click', deliverIt);
    }
  });
});
