// import { IoLocationOutline } from 'react-icons/io5';
// import { useState } from 'react';

// export default function Localization() {
//     const [startLocation, setStartLocation] = useState(false);

//     function askLocation() {
//         if('geolocation' in navigator) {
//             navigator.geolocation.getCurrentPosition((position) => 
//             console.log(position), (error) => 
//             {
//                 alert('Não foi possível iniciar localização');
//                 setStartLocation(false);
//             }
//         )
//         } else {
//             alert('Não foi possível iniciar localização');
//             setStartLocation(false);
//         };
//     }


//     return (
//         <div onClick={() => {
//             setStartLocation(!startLocation);
//             askLocation();
//             }
//         }>
//             {<IoLocationOutline />}
//         </div>
//     )
// }

