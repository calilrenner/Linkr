import { IoLocationSharp } from 'react-icons/io5';
import { useState } from 'react';
import MapContainer from './MapContainer';
import { getFollows } from '../service/api.service';


export default function Localization(geolocation) {
    const [getLocation, setGetLocation] = useState(false);
    return (
        <div>
            <IoLocationSharp onClick={() => setGetLocation(!getLocation)}/>
            {getLocation && <MapContainer geolocation={geolocation} setGetLocation={setGetLocation} getLocation={getLocation}/>}
        </div>
    )
}

