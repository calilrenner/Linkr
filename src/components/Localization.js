import { IoLocationSharp } from 'react-icons/io5';
import { useState } from 'react';
import styled from 'styled-components';
import MapContainer from './mapa';
import { colors } from '../globalStyles';


export default function Localization(geolocation) {
    const [getLocation, setGetLocation] = useState(false);
    const style = {
        width: '713px',
        height: '240px',
        position: 'absolute',
        margin: 'auto'
    }
    const containerStyle = {
        position: 'relative',
        width: '790px',
        height: '354px',
        zIndex: '900',
        backgroundColor: `${colors.white}`,
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }
    return (
        <div>
            <IoLocationSharp onClick={() => setGetLocation(true)}/>
            {getLocation && <BackgroundMap />}
        </div>
    )
}

// {getLocation && <BackgroundMap><MapContainer geolocation={geolocation} style={style} containerStyle={containerStyle}/></BackgroundMap>}
const BackgroundMap = styled.div`
    background: ${colors.white},
    width: 790px,
    height: 354px,
    position: absolute,
    border-radius: 20px,
    z-index: 900;
`

