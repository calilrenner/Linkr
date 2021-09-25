import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import styled from 'styled-components';
import { colors } from '../globalStyles';
import { AiOutlineClose } from 'react-icons/ai'

function MapContainer({geolocation, google, getLocation, setGetLocation}) {
    const style = {
        width: '713px',
        height: '240px',
        position: 'absolute',
        margin: '80px auto'
    }

    return (
        <MapBackground>
            <MapBorder>
                <MapHeader>
                    <MapDescription>Juvenals location</MapDescription>
                    <MapClose onClick={console.log('boa')}/>
                </MapHeader>
                <Map
                google={google}
                zoom={7}
                initialCenter={{ lat: parseFloat(geolocation.geolocation.latitude), lng: parseFloat(geolocation.geolocation.longitude)}}
                style={style}
                defaultOptions={false}
                >
                    <Marker position={{
                        lat: parseFloat(geolocation.geolocation.latitude),
                        lng: parseFloat(geolocation.geolocation.longitude)
                    }} />
                </Map>
            </MapBorder>
        </MapBackground>
    )
}

  export default GoogleApiWrapper(
    () => ({
      apiKey: 'AIzaSyAJRZlZOSH1BD5V-T0J4ywkqGiASo75_BY',
    }
  ))(MapContainer)

  const MapBorder = styled.div`
    height: 354px;
    width: 790px;
    background-color: ${colors.black};
    border-radius: 20px;
    margin: auto;
    position: relative;
    `

 const MapBackground = styled.div`
        z-index: 10000000;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: #FFFFFFE5;
        display: flex;
        justify-content: center;
        align-items: center;
 `

 const MapDescription = styled.h1`
    font-size: 38px;
    font-weight: bold;
 `

 const MapHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    align-items: center;
    margin: 20px 40px;
 `

 const MapClose = styled(AiOutlineClose)`
    height: 31px;
    width: 31px;
 `