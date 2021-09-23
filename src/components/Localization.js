// import { IoLocationSharp } from 'react-icons/io5';
// import { useState } from 'react';
// import { withGoogleMap, GoogleMap, Marker, withScriptjs } from "react-google-maps";
// import styled from 'styled-components';

// export default function Localization(geolocation) {
//     const [getLocation, setGetLocation] = useState(false);

//     function gMaps() {
//         return (
//             <GoogleMap defaultZoom={8} defaultCenter={{ lat: parseFloat(geolocation.geolocation.latitude), lng: parseFloat(geolocation.geolocation.longitude) }}>
//                 <Marker position={{ lat: parseFloat(geolocation.geolocation.latitude), lng: parseFloat(geolocation.geolocation.longitude) }} />
//             </GoogleMap>
//         );
//     }

//     const WrappedMap = withScriptjs(withGoogleMap(gMaps))

//     return (
//         <div onClick={() => setGetLocation(!getLocation)}>
//             <IoLocationSharp />
//             {getLocation && 
//             <Map>
//                 <WrappedMap 
//                     googleMapURL={``} 
//                     loadingElement={<div style={{height: '100%'}} />}
//                     containerElement={<div style={{height: '100%'}} />}
//                     mapElement={<div style={{height: '100%'}} />}
//                 />
//             </Map>}
//         </div>
//     )
// }

// const Map = styled.div`
//     position: fixed;
//     width: 100vw;
//     height: 100vh;
//     z-index: 1000;
// `

