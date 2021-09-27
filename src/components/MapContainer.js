import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import styled from 'styled-components';
import { colors } from '../globalStyles';
import { AiOutlineClose } from 'react-icons/ai'

function MapContainer({geolocation, google, getLocation, setGetLocation, name}) {
    
    const style = {
        maxWidth: '713px',
        width: '100%',
        height: '240px',
        position: 'absolute',
        margin: '80px auto',
    }

    let nameArray = name.split(' ');

    return (
        <MapBackground>
            <MapBorder>
                <MapHeader>
                    <MapDescription>{nameArray[0]}'s location</MapDescription>
                    <MapClose onClick={() => setGetLocation(!getLocation)}/>
                </MapHeader>
                <Map
                google={google}
                zoom={7}
                initialCenter={{ lat: parseFloat(geolocation.latitude), lng: parseFloat(geolocation.longitude)}}
                style={style}
                fullscreenControl={false}
                zoomControl={false}
                >
                    <Marker position={{
                        lat: parseFloat(geolocation.latitude),
                        lng: parseFloat(geolocation.longitude)
                    }} />
                </Map>
            </MapBorder>
        </MapBackground>
    )
}

  export default GoogleApiWrapper(
    () => ({
      apiKey: '',
    }
  ))(MapContainer)

  const MapBorder = styled.div`
    height: 354px;
    width: 790px;
    background-color: ${colors.black};
    border-radius: 20px;
    margin: auto;
    position: relative;

    @media (max-width: 1000px) {
        border-radius: 0;
        width: 100%
    }
    `

 const MapBackground = styled.div`
        z-index: 30;
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgb(255, 255, 255, 0.25);
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

    @media (max-width: 1000px) {
        margin: 20px 10px 20px 10px;
    }
 `

 const MapClose = styled(AiOutlineClose)`
    z-index: 100;
    height: 31px;
    width: 31px;
    cursor: pointer;
 `