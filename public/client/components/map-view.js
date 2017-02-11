import React from 'react';
import axios from 'axios';

export default class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="googleMaps" style={{height : '500px', width : '500px'}}></div>
      </div>
    );
  }

  componentDidMount() {
    this.createMap();
  }

  createMap() {
    const context = this;

    /* ########## JSONP call for Google Map data ########## */
    (function fetchMap() {
      window.initMap = initMap;
      console.log('fetching map!')
      const ref = window.document.getElementsByTagName('script')[0];
      const script = window.document.createElement('script');
      script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyCBb0bm-_wNIf3oDMi-5PN_zeOf1bRWstI&libraries=places&callback=initMap';
      ref.parentNode.insertBefore(script, ref);
      script.onload = function () {
        console.log('onload: ', this)
        this.remove();
      };
    })();

    /* ################### Map Init ################### */
    let map, places, autocomplete;
    let markers = [];
    const searchForm = document.getElementById('searchForm');


    function initMap() {
      var HackReactor = {lat: 37.783744, lng: -122.409079}; // Hack Reactor Position
      var map = new google.maps.Map(document.getElementById('googleMaps'), {
        center: HackReactor,
        zoom: 17,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
       });

      var marker = new google.maps.Marker({
         position: {lat: 37.784855, lng: -122.410190},
         map: map,
         icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 17
         },
         title: 'Party'
       });

      var contentString =   '<div id="content">'+
                              '<div id="siteNotice">'+'</div>'+
                            // HEADER - PARTY GROUP TITLE
                              '<h2 id="firstHeading" class="firstHeading">PARTY UP IN HERE</h2>'+
                              '<div id="bodyContent">'+
                            // DJ + 'UserName' - Location (could make it as specific as we want)
                              '<h4>DJ MARCUS - Powell St.</h4>'+
                            // Stock Message -- ADD 'YES' and 'NO' actionEventListeners
                              '<p>Would You Like to Join the Party?  <button>YES</button><button>NO</button></p>'+
                              '</div>'+
                            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // });

      // Information Text for the InfoWindow Popup Upon User Clicking on Marker

       // Info about DJ Party Pop-Up on Map

       //Clicking on marker pops up InfoWindow of 'DJ Music Party'
       marker.addListener('click', function() {
         map.setZoom(16);
         // infowindow.open(map, marker);
         map.panTo(marker.getPosition());
         map.setCenter(marker.getPosition());
         infowindow.open(map, marker);
       });
    }

    function createMarkers (partyArray) {
      var map = new google.maps.Map(document.getElementById('googleMaps'), {
          center: {lat: 37.783744, lng: -122.409079},
          zoom: 17,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
      });

      partyArray.forEach(function(party, index) {
        console.log(party)
        var latitude = Number(party.latitude);
        var longitude = Number(party.longitude);
        var marker = new google.maps.Marker({
         position: {lat: latitude, lng: longitude},
         map: map,
         icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 17
         },
         title: 'Party'
       });
      })
    }

    function getParties () {
      axios.get('/api/parties')
      .then(function(res){
        console.log('this is a party get request: ', res, typeof res.data[0].latitude);

        // var latitude = Number(res.data[0].latitude);
        // var longitude = Number(res.data[0].longitude);

        
        createMarkers(res.data);
        
      })
      .catch(function(error){
        console.log('Not able to POST the party: ', error);
      });
    }

    getParties();

    function clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        if (markers[i]) {
          markers[i].setMap(null);
        }
      }
      markers = [];
    }

    function dropMarker(i) {
      return function() {
        markers[i].setMap(map);
      };
    }

    function setPlace() {
      const marker = this;
      places.getDetails({placeId: marker.placeResult.place_id},
      function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        context.props.updatePlace(place);
      });
    }
  }
}