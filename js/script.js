$(document).ready(function() {


    // Clean CSS Animations
    $('body').removeClass('preload');


    // Header scrolls

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
        slideIndex = 1,
        sliderWrapperWidthInitial = sliderWrapper.innerWidth();
    // Making copies of li elements
    firstSlideCopy = slideImg.first().clone();
    lastSlideCopy = slideImg.last().clone();
    firstSlideCopy.appendTo(slides);
    lastSlideCopy.prependTo(slides);
    // Updating array length
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

            $(slides).animate({

                left: '+=' + slideValue

            }, 500, function() {

                if (slideIndex === 0) {

                    $(slides).animate({

                        left: '-=' + slideValue * (slideImg.length - 2),
                    }, 0);

                    slideIndex = slideImg.length - 2;

                }
            });

            slideIndex--;



        });


        $(rightArrow).off().on('click', function() {
            var slideValue = sliderWrapper.innerWidth();


            $(slides).animate({

                left: '-=' + slideValue

            }, 500, function() {

                if (slideIndex === slideImg.length - 1) {

                    $(slides).animate({

                        left: '+=' + slideValue * (slideImg.length - 2)
                    }, 0);

                    slideIndex = 1;

                }
            });

            slideIndex++;



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
    //
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

    // Keep submenu style when hovering submenu links

    var subMenuLinksParents = $('nav').find('.sub-menu-link').parent(); // targeting all parent elements of submenu links

    subMenuLinksParents.hover(function() {
        // targeting only main menu links to keep the hover effect on them while hovering over the submenu
        $(this).parent().parent().find(">:first-child").addClass('nav-hover');

    }, function() {

        $(this).parent().parent().find(">:first-child").removeClass('nav-hover');
    });


    // Handle slick-carousel

    $('.opinion-carousel').slick({
        autoplay: true,
        infinite: true,
        responsive: [{
            breakpoint: 568,
            settings: {

                arrows: false,
            }
        }]
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
                    // window.location.replace('http://www.wp.pl');
                    errorMessage.css('backgroundColor', 'green');
                    errorMessage.text('Udało się wysłać wiadomość!');
                    errorMessage.fadeIn('400');
                    form.reset();
                })
                .fail(function(error) {

                    console.log(error);
                });
        }



    });

    // Google Maps



    var googleScript = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5pi56IdWtbcUAqQL8qtkS9QVC38GSHKQ';

    function initMap() {
        var myLatLng = {
            lat: 52.1331211,
            lng: 20.657210299999974
        };

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: myLatLng,
            styles: [{
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "color": "#444444"
                    }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{
                        "color": "#f2f2f2"
                    }]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [{
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ],
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Centrum Terapii Uzależnień i Zaburzeń Nalmed'
        });
    }

    $.getScript(googleScript, initMap);



});
