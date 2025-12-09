$(function () {


  // scrol menu 
  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]:not(.images__link):not(.preview__link)').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');

      var target = this.hash,
        menu = target;
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top + 2
      }, 1500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('#menu-center ul li a').removeClass("active");
        currLink.addClass("active");
      }
      else {
        currLink.removeClass("active");
      }
    });
  }
  // Попапы
  $('.popup').each(function (i) {
    let trigger = $(this).attr('data-popup-id');
    let modal = $('#' + trigger);

    $(modal).appendTo('.site-popups');

    $(this).click(function () {
      $(modal).show();
    });

    $(modal)
      .find('.close-popup')
      .click(function (e) {
        $(modal).hide();
      });

    $(modal)
      .find('.popup-overlay')
      .click(function () {
        if (event.target !== this) return;
        $(modal).hide();
      });

    $(document).keydown(function (e) {
      if (e.key === 'Escape') {
        $(modal).hide();
      }
    });
  });
  // Бургер-меню
  $('.burger-menu').click(function () {
    $(this).toggleClass('active');
    $('.header__nav').toggleClass('active');
  });

  // Закрытие меню при клике на ссылку
  $('.menu a').click(function () {
    $('.burger-menu').removeClass('active');
    $('.header__nav').removeClass('active');
  });



  // count
  let counted = false;

  $.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({
      start: 0,
      end: 100,
      easing: 'swing',
      duration: 400,
      complete: ''
    }, options);

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete
    });
  };

  function startCounter() {
    if (!counted) {
      $('#number1').jQuerySimpleCounter({end: 1200, duration: 3000});
      $('#number2').jQuerySimpleCounter({end: 25000, duration: 3500});
      $('#number3').jQuerySimpleCounter({end: 100, duration: 2300});
      $('#number4').jQuerySimpleCounter({end: 40000, duration: 4000});
      counted = true;
    }
  }

  // Запуск счетчика при прокрутке до блока
  $(window).on('scroll', function () {
    var counterPos = $('.counter').offset().top;
    var scrollPos = $(window).scrollTop() + $(window).height();

    if (scrollPos > counterPos && !counted) {
      startCounter();
    }
  });

  $.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({
      start: 0,
      end: 100,
      easing: 'swing',
      duration: 400,
      complete: ''
    }, options);

    var thisElement = $(this);

    $({count: settings.start}).animate({count: settings.end}, {
      duration: settings.duration,
      easing: settings.easing,
      step: function () {
        var mathCount = Math.ceil(this.count);
        thisElement.text(mathCount);
      },
      complete: settings.complete
    });
  };


  $('#number1').jQuerySimpleCounter({end: 12000, duration: 3200});
  $('#number2').jQuerySimpleCounter({end: 25000, duration: 3500});
  $('#number3').jQuerySimpleCounter({end: 100, duration: 2300});
  $('#number4').jQuerySimpleCounter({end: 40000, duration: 4000});



  /* AUTHOR LINK */
  $('.about-me-img').hover(function () {
    $('.authorWindowWrapper').stop().fadeIn('fast').find('p').addClass('trans');
  }, function () {
    $('.authorWindowWrapper').stop().fadeOut('fast').find('p').removeClass('trans');
  });

  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.querySelector(".accordion-item-header").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });


})