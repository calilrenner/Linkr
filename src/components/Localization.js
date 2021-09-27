import { IoLocationSharp } from 'react-icons/io5';
import { useContext } from 'react';
import MapContainer from './MapContainer';
import UserContext from '../contexts/UserContext';


export default function Localization({geolocation, name}) {
    const { setGetLocation, getLocation } = useContext(UserContext);

    return (
        <div>
            <IoLocationSharp style={{cursor: 'pointer'}} onClick={() => setGetLocation(!getLocation)}/>
            {getLocation && <MapContainer geolocation={geolocation} setGetLocation={setGetLocation} getLocation={getLocation} name={name}/>}
        </div>
    )
}

