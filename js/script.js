$(document).ready(function() {


    // Clean CSS Animations
    $('body').removeClass('preload');


    // Header scroll

    $(window).scroll(function() {
        var scrollValue = $(this).scrollTop();

        if (scrollValue > 0) {

            $('header').addClass('onScroll');
        } else {

            $('header').removeClass('onScroll');
        }
    });

    // Mobile-Menu Animation

    var hambuger = $('.hamburger');
    hambuger.on('click', function() {

        $(this).toggleClass('extended');

        $('.mobile-menu').animate({

            height: 'toggle',
            opacity: 'toggle'
        }, 'quick');

    });

    // Image slider

    var leftArrow = $('.left'),
        rightArrow = $('.right'),
        sliderWrapper = $('.slides'),
        slideImg = $('.slider-wrapper').find('li'),
        slideIndex = 0;
        liWidth = (100 / slideImg.length) + "%";

    slideImg.css('width', liWidth);

    $(leftArrow).on('click', function() {

        if (slideIndex > 0) {

            $(sliderWrapper).animate({

                left: "+=100%"

            }, 500);

            slideIndex--;
        }


    });


    $(rightArrow).on('click', function() {

        if (slideIndex < $(slideImg).length - 1) {

            $(sliderWrapper).animate({

                left: "-=100%"

            }, 500);

            slideIndex++;
            console.log(slideIndex);
        }


    });

    //  Hide mobile-menu and reset hamburger class when mobile-menu is visible and hamburger class disappears due to size-change
    $(window).on('resize', function() {
        var windowWidth = $(this).innerWidth();
        if (windowWidth > 992 && $('.hamburger').hasClass('extended')) {

            $('.mobile-menu').css('display', 'none');
            $('.hamburger').toggleClass('extended');
        }

    });

    // Inline Menu 'slide to sections' animation
    var menuLinks = $('nav').find('li a');

    menuLinks.on('click', function() {

        var href = $(this).attr('href');
        console.log(href);

        if (href.indexOf('#') === 0) {

            var divOffsetTop = $(href).offset().top;

            $('body').animate({

                scrollTop: divOffsetTop

            }, 1000);

        }

    });

    // Validate form

    var errorMessage = $('.error-message'),
        form = $('#myForm'),
        nameInput = $('#nameInput'),
        emailInput = $('#emailInput'),
        subject = $('#subject'),
        message = form.find('#message');

    form.on('submit', function(e) {

        e.preventDefault();

        var formData = {

            name: nameInput.val(),
            email: emailInput.val(),
            subject: subject.val(),
            message: message.val()

        };

        if (formData.name.length < 5) {

            errorMessage.text('Za krótkie imię');
            errorMessage.fadeIn('400');

        } else if (formData.email.indexOf('@') === -1 || formData.email.indexOf('.') === -1) {
            errorMessage.text('Niepoprawny adres e-mail');
            errorMessage.fadeIn('400');
        } else if (formData.subject.length < 5) {
            errorMessage.text('Za krótki temat wiadomości');
            errorMessage.fadeIn('400');
        } else if (formData.message.length < 10) {
            errorMessage.text('Za krótka wiadomość');
            errorMessage.fadeIn('400');
        } else {

            $.ajax({

                    type: "POST",
                    url: 'mail.php',
                    data: formData,
                    dataType: 'json'


                }).done(function(success) {
                    console.log(success);
                    errorMessage.css('backgroundColor', 'green');
                    errorMessage.text('Udało się wysłać wiadomość!');
                    errorMessage.fadeIn('400');

                })
                .fail(function(error) {

                    console.log(error);
                })
        }



    });


});
