import React from 'react'
import {GoogleMap, Marker, InfoWindow, useLoadScript} from '@react-google-maps/api'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import './GoogleMap.css'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionvatNo } from './redux/action';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
const mapContainerStyle={
  width:'100vw',
  height: '100vh'
}
const center = { 
  lat :27.717245, 
  lng:85.323959 
}
const libraries=["places"];
export default function SimpleMap(){
  const centre = useSelector(state => state.center)
  const [data, setdata] = useState([])
  const [Selected, setSelected] = useState(null)
  const dispatch=useDispatch()
  useEffect(() => {
    async function getHostData() {
        const response = await fetch('http://localhost:9000/userhome');
        const {data} = await response.json();
        setdata({data}.data);
    }
    getHostData();
}, [])
  const {isLoaded,loadError}=useLoadScript({
    googleMapsApiKey: "AIzaSyBEbdwDIlO8ETUQve_lDZBMN9e0q1EY-M4",
    libraries
  }
  );
  const mapRef=useRef();
  const onMapLoad=useCallback((map)=>{
    mapRef.current=map;
  },[]);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  if(loadError) return 'Error loading map';
  if(!isLoaded) return "Map is loading";
  function addVatNo(vatno){
    dispatch(actionvatNo(vatno))
}
  return (
  <div>
    {/* <Search /> */}
    <GoogleMap
    mapContainerStyle={mapContainerStyle}
    center={center}
    zoom={10}
    onLoad={onMapLoad}
    >
      {console.log(data)}
      <Locate panTo={panTo} />
      {Object.keys(data ??[]).map((keys)=>{
        return(
          <Marker key={keys} 
            position={{
              lat:parseFloat(data[keys].latitude),
              lng:parseFloat(data[keys].longitude)
            }}
            onClick={()=>{
              setSelected(data[keys])
            }}
          />
          
        )
      })}
      {Selected ? (<InfoWindow
              position={{
                lat:parseFloat(Selected.latitude),
                lng:parseFloat(Selected.longitude)
              }}
              onCloseClick={()=>setSelected(null)}
            >
              <div>
              <p>{Selected.hostName}</p>
              <Link to={`/partypalace/${Selected.hostName}`}><button onClick={()=>addVatNo(Selected.vatNo)}>See more</button></Link>
              </div>
            </InfoWindow> ): null}
    </GoogleMap>
  </div>
  )

}
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <GpsFixedIcon className='googleMap__icon'/>
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions:{
      location: { lat: () => 27.717245, lng: () => 85.323959 },
      radius: 100 * 1000,
    },
  });
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        
      </Combobox>
    </div>
  );
}