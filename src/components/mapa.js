import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

function MapContainer({geolocation, google, style, containerStyle}) {

    return (
        <Map
          google={google}
          zoom={7}
          initialCenter={{ lat: parseFloat(geolocation.geolocation.latitude), lng: parseFloat(geolocation.geolocation.longitude)}}
          style={style}
          containerStyle={containerStyle}
        >
            <Marker position={{
                lat: parseFloat(geolocation.geolocation.latitude),
                lng: parseFloat(geolocation.geolocation.longitude)
            }} />
        </Map>
    )
}

  export default GoogleApiWrapper(
    (props) => ({
      apiKey: 'AIzaSyAJRZlZOSH1BD5V-T0J4ywkqGiASo75_BY',
    }
  ))(MapContainer)