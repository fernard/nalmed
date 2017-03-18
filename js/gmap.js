

  var map;

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
