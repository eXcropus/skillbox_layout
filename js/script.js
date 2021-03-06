$(document).ready(function () {
  $('.pop-up__item_tel').inputmask({
    "mask": "+7 (999) 999-9999"
  });

  $('form').each(function () {
    $(this).validate({
      errorPlacement(error, element) {
        return true;
      },
      focusInvalid: false,
      rules: {
        number: {
          required: true,
          minlength: 17,
        },
        mail: {
          required: true,
          email: true,
          minlength: 7,
        }
      },
      submitHandler(form) {
        let th = $(form);
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: th.serialize(),
        }).done(() => {
          console.log('Отправлено')
          th.trigger('reset');
          $('.pop-up__container').fadeOut(100);
          $('.pop-up__thanks').addClass('pop-up_active');
          setTimeout(function () {
            $('.pop-up').fadeOut();
            $('body').removeClass('fixed');
          }, 3500)
        });
        return false;
      }
    });
  });

  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: '.arrow__right',
      prevEl: '.arrow__left',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      1441: {
        slidesPerView: 3,
        spaceBetween: 20,
        pagination: {
          hiddenClass: 'swiper-pagination-hidden',
        },
      },
      1025: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });

  // Плавный скролл
  $('.scroll-smooth').on('click', function (event) {
    event.preventDefault();
    let href = $(this).attr('href');
    let offset = $(href).offset().top;
    $('body, html').animate({
      scrollTop: offset,
    }, 500);
  });

  // Анимация при скролле
  $(window).scroll(function () {
    var offset = $('.prices').offset();
    if ($(this).scrollTop() > offset.top - $('.prices').height()) {
      $(".prices__fly-item").addClass('active');
      $('.prices__fly-item').removeClass('animate');
    }
  });

  // POP-UP ОКНО
  function flyBlock() {
    $('.pop-up').fadeToggle(500);
    $('body').addClass('fixed');
  };
  $('body').on('click', '.pop-up-open__btn, .callback', flyBlock);

  $('.pop-up').click(function (event) {
    if (event.target == this) {
      $(this).fadeOut();
      $('body').removeClass('fixed');
    }
  });

  // БУРГЕР ОКНО
  function burgerOpen() {
    $('.burger-up').fadeToggle(500);
    $('body').addClass('fixed');
  };
  $('body').on('click', '.burger', burgerOpen);

  // Закрытие pop-up`ов 
  function closePop() {
    $('.burger-up').fadeOut();
    $('.pop-up').fadeOut();
    $('body').removeClass('fixed');
  };

  $('body').on('click', '.pop-up__close, .burger-up__close, .burger-up__link', closePop);
  
})