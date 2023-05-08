import {useEffect, useState} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, getLocationsCollection} from "@/services/firebase";
import {useRouter} from "next/navigation"
import NavigationBar from "@/components/navigation-bar";

import {Jaldi} from 'next/font/google'

const jaldi = Jaldi({weight: '400', subsets: ['latin']});

export default function Reservations() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [user, loading] = useAuthState(auth);
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState();

    const fetchLocations = async (searchQuery) => {
        await getLocationsCollection(searchQuery).then(result => {
            setLocations(result)
        });
    }
    const getCurrentLocation =  () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLocation(position.coords) 
        });
    }
    useEffect(() => {
        document.querySelector('html').style.overflowY = 'scroll'
        fetchLocations(searchQuery);
        if (!currentLocation) getCurrentLocation()
        console.log(currentLocation)
        if (!user) router.push('/log-in');
    }, [user, searchQuery, currentLocation]);
    return (
        <main
            className={`mx-auto max-w-sm flex ${jaldi.className} box-border min-h-screen overflow-auto flex-nowrap justify-center`}>
            <div
                className="mx-4 mt-8 mb-16 flex w-full flex-col flex-nowrap content-between text-black">
                <div className="my-4 text-center text-3xl">
                    Pick-up locations
                </div>
                <div className="my-4">
                    <input
                        className="w-full appearance-none rounded-2xl border border-black px-3 text-xl leading-tight text-black shadow py-1.5 focus:shadow-outline focus:outline-none"
                        id="searchQuery" type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."/>
                </div>
                <div className="mb-16 flex flex-wrap">
                    {locations.map((location) => (
                        <div key={location.id} className="my-3 flex h-32 w-full flex-col bg-neutral-200 px-2 shadow">
                            <div className="h-1/5 w-full py-3 text-xl">
                                <div className="">
                                    <div className="text-base leading-5 text-neutral-600">Street name</div>
                                    <div>{location.address}</div>
                                </div>
                                <div>
                                    <div className="text-base leading-5 text-neutral-600">Distance</div>
                                    <div>{getDistance(currentLocation, location.location)}</div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <NavigationBar/>
        </main>
    )
}

function getDistance(currentLocation, destinedLocation) {
    let R = 6371.0710;
    
    let rLat1 = currentLocation?.latitude * (Math.PI / 180);
    let rLat2 = destinedLocation?.latitude * (Math.PI / 180);
    
    let radianDiffLat = rLat2 - rLat1;
    let radianDiffLng = (destinedLocation?.longitude - currentLocation?.longitude) * (Math.PI / 180);

    let distance = 2 * R * Math.asin(Math.sqrt(Math.sin(radianDiffLat / 2) * Math.sin(radianDiffLat / 2) + Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(radianDiffLng / 2) * Math.sin(radianDiffLng / 2)));
    if (isNaN(distance)){
        return 'Could not assert localization';
    }
    return Math.round(distance*100)/100 + ' km'

}