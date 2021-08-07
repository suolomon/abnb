import {useState} from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { StarIcon } from "@heroicons/react/solid";

function Map({searchResults}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    
    //transform search result object into latitude: 37.7577, longitude: -122.4376,
    const coordinates = searchResults.map((result) => ({
        longitude:result.long,
        latitude:result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
      width: "100%",
      height: "100%",
      latitude: center.latitude,
      longitude: center.longitude,
      zoom: 11,
    });


    return (
      <ReactMapGL
        mapStyle="mapbox://styles/solohmon/cks0mssgh3y1e18p6q7bg15oz"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer z-0 border-2 border-black rounded-lg text-black bg-gray-100 shadow-xl text-sm p-1 font-bold hover:animate-bounce hover:bg-black hover:text-white active:scale-90 transition duration-300 hover:border-2 hover:border-black  "
                aria-label="label-pin"
              >
                {result.price.slice(0, 4)}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 animate-pulse text-2xl"
                  fill="red"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg> */}
              </p>
            </Marker>
            {/* pop up if click on a maker */}
            <div className="text-black lex flex-col ">
              {selectedLocation.long === result.long ? (
                <Popup
                  onClose={() => setSelectedLocation({})}
                  closeOnClick={true}
                  latitude={result.lat}
                  longitude={result.long}
                  className="z-50"
                >
                  <p className="font-bold text-sm pb-2"> {result.title}</p>
                  <div className="">
                    <img
                      className="h-[200px] rounded-lg center"
                      src={result.img}
                    />
                    {/* <p className="ml-2 text-sm"> {result.description}</p> */}
                  </div>
                  {/* <p className="ml-2 text-sm m-w-50px"> {result.description}</p> */}

                  <div className="flex justify-between pl-2 pb-2 pt-2">
                    <p className="flex items-center">
                      <StarIcon className="h-5 text-red-400" />
                      {result.star}
                    </p>
                    <p className="font-bold"> {result.price}</p>
                  </div>
                </Popup>
              ) : (
                false
              )}
            </div>
          </div>
        ))}
        {/* { console.log(selectedLocation)} */}
      </ReactMapGL>
    );
}

export default Map
