$(document).ready(function() {

    // Clean CSS Animations
    $('body').removeClass('preload');

    // Inline Menu Animation
    var menuLinks = $('nav').find('li a');
    console.log(menuLinks);

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
