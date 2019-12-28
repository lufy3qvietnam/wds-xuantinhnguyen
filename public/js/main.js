(function ($) {
  var cart = {
    sum: 0,
    items: []
  }

  // "use strict";



  /*--------------------------
 
  preloader
 
  ---------------------------- */

  $(window).on('load', function () {

    var pre_loader = $('#preloader');

    pre_loader.fadeOut('slow', function () {

      $(this).remove();

    });

  });

  /*---------------------
 
   TOP Menu Stick
 
  --------------------- */

  var s = $("#sticker");

  var pos = s.position();

  $(window).on('scroll', function () {

    var windowpos = $(window).scrollTop() > 300;

    if (windowpos > pos.top) {

      s.addClass("stick");

    } else {

      s.removeClass("stick");

    }

  });

  /*----------------------------
 
   Navbar nav
 
  ------------------------------ */

  var main_menu = $(".main-menu ul.navbar-nav li ");

  main_menu.on('click', function () {

    main_menu.removeClass("active");

    $(this).addClass("active");

  });

  /*----------------------------
 
   wow js active
 
  ------------------------------ */

  new WOW().init();

  $(".navbar-collapse a:not(.dropdown-toggle)").on('click', function () {

    $(".navbar-collapse.collapse").removeClass('in');

  });

  //---------------------------------------------

  //nivo slider

  //---------------------------------------------

  $('#ensign-nivoslider').nivoSlider({

    effect: 'random',

    slices: 15,

    boxCols: 12,

    boxRows: 8,

    animSpeed: 500,

    pauseTime: 5000,

    startSlide: 0,

    directionNav: true,

    controlNavThumbs: false,

    pauseOnHover: true,

    manualAdvance: false,

  });

  /*----------------------------
 
   Scrollspy js
 
  ------------------------------ */

  var Body = $('body');

  Body.scrollspy({

    target: '.navbar-collapse',

    offset: 80

  });

  /*---------------------
 
    Venobox
 
  --------------------- */

  // var veno_box = $('.venobox');

  // veno_box.venobox();

  /*----------------------------
 
  Page Scroll
 
  ------------------------------ */

  var page_scroll = $('a.page-scroll');

  page_scroll.on('click', function (event) {

    var $anchor = $(this);

    $('html, body').stop().animate({

      scrollTop: $($anchor.attr('href')).offset().top - 55

    }, 1500, 'easeInOutExpo');

    event.preventDefault();

  });

  /*--------------------------
 
    Back to top button
 
  ---------------------------- */

  $(window).scroll(function () {

    if ($(this).scrollTop() > 100) {

      $('.back-to-top').fadeIn('slow');

    } else {

      $('.back-to-top').fadeOut('slow');

    }

  });

  $('.back-to-top').click(function () {

    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');

    return false;

  });

  /*----------------------------
 
   Parallax
 
  ------------------------------ */

  var well_lax = $('.wellcome-area');

  well_lax.parallax("50%", 0.4);

  var well_text = $('.wellcome-text');

  well_text.parallax("50%", 0.6);

  /*--------------------------
 
   collapse
 
  ---------------------------- */

  var panel_test = $('.panel-heading a');

  panel_test.on('click', function () {

    panel_test.removeClass('active');

    $(this).addClass('active');

  });

  /*---------------------
 
   Testimonial carousel
 
  ---------------------*/

  var test_carousel = $('.testimonial-carousel');

  test_carousel.owlCarousel({

    loop: true,

    nav: false,

    dots: true,

    autoplay: true,

    responsive: {

      0: {

        items: 1

      },

      768: {

        items: 1

      },

      1000: {

        items: 1

      }

    }

  });

  /*----------------------------
 
   isotope active
 
  ------------------------------ */

  // portfolio start

  $(window).on("load", function () {

    var $container = $('.awesome-project-content');

    $container.isotope({

      filter: '*',

      animationOptions: {

        duration: 750,

        easing: 'linear',

        queue: false

      }

    });

    var pro_menu = $('.project-menu li a');

    pro_menu.on("click", function () {

      var pro_menu_active = $('.project-menu li a.active');

      pro_menu_active.removeClass('active');

      $(this).addClass('active');

      var selector = $(this).attr('data-filter');

      $container.isotope({

        filter: selector,

        animationOptions: {

          duration: 750,

          easing: 'linear',

          queue: false

        }

      });

      return false;

    });

  });

  //portfolio end

  /*---------------------
 
   Circular Bars - Knob
 
--------------------- */

  if (typeof ($.fn.knob) != 'undefined') {

    var knob_tex = $('.knob');

    knob_tex.each(function () {

      var $this = $(this),

        knobVal = $this.attr('data-rel');

      $this.knob({

        'draw': function () {

          $(this.i).val(this.cv)

        }

      });

      $this.appear(function () {

        $({

          value: 0

        }).animate({

          value: knobVal

        }, {

          duration: 2000,

          easing: 'swing',

          step: function () {

            $this.val(Math.ceil(this.value)).trigger('change');

          }

        });

      }, {

        accX: 0,

        accY: -150

      });

    });

  }

  // dem nguoc thoi gian xuan tinh nguyen

  var destinationTime = new Date("2020-01-01").getTime();

  setInterval(() => {

    var leftTime = destinationTime - Date.now();

    var days = Math.floor(leftTime / (1000 * 60 * 60 * 24));

    var hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    var minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));

    var seconds = Math.floor((leftTime % (1000 * 60)) / 1000);

    var dateString = days + " : " + hours + " : " + minutes + " : " + seconds;

    // countdown.text(dateString);

    $(".num-days").text(days);

    $(".num-hours").text(hours);

    $(".num-minutes").text(minutes);

    $(".num-seconds").text(seconds);

  }, 1000);

  //handle shopping cart

  $('.btn-buy').on('click', function () {

    var id = $(this).attr('id');

    $.ajax({

      url: '/products/add',

      method: 'post',

      data: {
        id: id
      },

      success: function (result) {

        $('.shop-item-add').children('p').remove();

        $('.shop-item-add').children('.shop-checkout').remove();

        $new_elem = $(`<li class="shop-checkout">
 
        <a class="shop-btn-checkout"data-toggle="modal" data-target="#confirmCheckout" >Thanh Toán <i class="fas fa-money-check"></i></a>
 
      </li>`);


        $(".shop-item-add").append($new_elem);
        $new_elem.on('click', function () {
          tinhtien()
        })
        $(`li[item-id=${result.id}]`).remove();
        $new_elem1 = $(`<div class="shop-remove-item" id="${result.id}">
        <i class="far fa-trash-alt"></i> Xóa sản phẩm
        </div>`);
        $new_elem1.on('click', function () {
          var id = $(this).attr('id');
          console.log(id)
          $.ajax({
        
            url: '/products/remove',
        
            method: 'post',
        
            data: {
              id: id
            },
        
            success: function (result) {
              $(`li[item-id=${result.id}]`).remove();
            },
        
            error: function () {
        
              console.log('error while shopping') //handle error trong backend
        
            }
        
          })
        })
        var itemString = `<li class="shop-item" item-id ="${result.id}" price="${result.price}">
        
          <span class="shop-item-name">${result.name}</span>
          <span class="shop-item-num">${result.number}</span>
 
        </li>`

        $('.shop-item-add').append(itemString);
        $('.shop-item').prepend($new_elem1);

      },

      error: function () {

        console.log('error while shopping') //handle error trong backend

      }

    })

  })
function xoaproduct(){
  var id = $(this).attr('id');
  console.log(id)
  $.ajax({

    url: '/products/remove',

    method: 'post',

    data: {
      id: id
    },

    success: function (result) {
      $(`li[item-id=${result.id}]`).remove();
    },

    error: function () {

      console.log('error while shopping') //handle error trong backend

    }

  })
}
  $('.shop-remove-item').click(function () {
    var id = $(this).attr('id');
    $.ajax({

      url: '/products/remove',

      method: 'post',

      data: {
        id: id
      },

      success: function (result) {
        $(`li[item-id=${result.id}]`).remove();
      },

      error: function () {

        console.log('error while shopping') //handle error trong backend

      }

    })

  })
  // ================================ checkout
  $('.shop-btn-checkout').on('click', function () {
    tinhtien()
  })

  function tinhtien() {
    var sumMoney = 0;
    cart = {
      sum: 0,
      items: [],
    }
    $('.checkout-list').html('')
    $('.shop-item').each(function (item) {
      price = parseInt($(this).attr('price'));
      number = parseInt($(this).find('.shop-item-num').text());
      money = price * number;
      sumMoney = sumMoney + money;
      name = $(this).find('.shop-item-name').text();
      cart.sum = sumMoney;
      cart.items.push({
        name: name,
        number: number,
        money: money
      })
      htmlString = `
    <tr>
    <td scope="row">${name}</td>
    <td>${number}</td>
    <td>${money}</td>
    </tr>
    `
      $('.checkout-list').append(htmlString);
    })
    $('.checkout-list').append(`
  <tr>
  <td scope="row">Tổng tiền:</td>
  <td></td>
  <td>${sumMoney}</td>
  </tr> 
  `)
  }
  // ==================== thanh toan
  $('.btn-thanhtoan').on('click', () => {
    capchaResponse = $("#g-recaptcha-response").val();
    name = $('.user-name').val();
    contact = $('.user-contact').val();
    address = $('.user-address').val();
    note = $('.user-note').val();
    if (!name || !contact || !address) {
      return $('.modal-content').prepend(`<p class="error-title">Điền các giá trị hợp lệ</p>`)
    }
    user = {
      capchaResponse: capchaResponse,
      name: name,
      contact: contact,
      address: address,
      note: note
    }
    $.ajax({
      url: "/checkout",
      method: "post",
      data: {
        cart: cart,
        user: user
      },
      success: function (result) {
        if (result.success === true) {
          $('.modal-content').html('<h1>Cảm ơn bạn đã mua hàng</h1>');
          $('.btn-thanhtoan').remove();
          setTimeout(() => {
            location.reload()
          }, 1000)
        } else {
          $('.modal-content').prepend(`<p class="error-title">${result.error}</p>`)
        };
      },
      error: function (err) {
        console.log(err)
      }
    })
  })

})(jQuery);