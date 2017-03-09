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
        slides = $('.slides'),
        sliderWrapper = $('.slider-wrapper');
        slideImg = $('.slides').find('li'),
        slideIndex = 0,
        sliderWrapperWidthInitial = sliderWrapper.innerWidth();
        // Making copies of li elements
        firstSlideCopy = slideImg.first().clone();
        lastSlideCopy = slideImg.last().clone();
        firstSlideCopy.appendTo(slides);
        lastSlideCopy.prependTo(slides);
        // Updating array length - tutaj mam największy problem, bo nadpisuję zmienną, ale inaczej nie jestem w stanie dynamicznie uaktualnić długości tablicy z elementami li, która jest mi potrzebna do ustalenia szerokości kontenera i szerokości poszczególnych obrazków
        slideImg = $('.slides').find('li');

        // Setting each li element width

        var liWidth = (100 / slideImg.length) + "%";
        slideImg.css('width', liWidth);

        // Handles the sliding width dynamically updated slider wrapper width

      function launchSlider(sliderWrapperWidth) {

        var slidesWidth = sliderWrapperWidth * slideImg.length;
        slides.css('width', slidesWidth).css('left', (slideIndex * sliderWrapperWidth) * -1);

        $(leftArrow).off().on('click', function() {
            var slideValue = sliderWrapper.innerWidth();
            if (slideIndex > 0) {

                $(slides).animate({

                    left: '+=' + slideValue

                }, 500);

                slideIndex--;
            }


        });


        $(rightArrow).off().on('click', function() {
            var slideValue = sliderWrapper.innerWidth();
            if (slideIndex < slideImg.length - 1) {

                $(slides).animate({

                    left: '-=' + slideValue

                }, 500);

                slideIndex++;
            }


        });

    }

    // launching the function with initial width as argument

    launchSlider(sliderWrapperWidthInitial);


    // Handling resize function


    $(window).on('resize', function() {

          // Slider wrapper width is dynamically updated on each window resize and the function is launched with the new wrapper width as the argument

        var windowWidth = $(this).innerWidth(),
            sliderWrapperWidth = sliderWrapper.innerWidth();

        launchSlider(sliderWrapperWidth);

        //  Hide mobile-menu and reset hamburger class when mobile-menu is visible and hamburger class disappears due to size-change
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
            // Sending form data
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
