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


});
