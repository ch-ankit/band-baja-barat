import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from 'react-bootstrap/Button'
import './GoogleMap.css'
import { useState } from 'react';
import { useEffect } from 'react';
 
const AnyReactComponent = ({ text }) => <div>
    <Button style={{width:'10px',fontSize:'10px',display:'flex',alignContent:'flex-start'}}>{text}</Button>
  </div>
 
function SimpleMap(){
  const [data, setdata] = useState([]);
  useEffect(() => {
      async function getHostData() {
          const response = await fetch('http://localhost:9000/userhome');
          const {data} = await response.json();
          setdata({data});
      }
      getHostData();
  }, [])
  const [center,setCenter]=useState({
    lat: 27.6758528,
    lng: 85.3671936,
  });
  const [zoom, setzoom] = useState(14);
    return (
      // Important! Always set the container height explicitly
      <div className="googleMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA7TVORrDdi2WUm4l2GSkWIVqyq8AovX7U'}}
          defaultCenter={center}
          defaultZoom={zoom}
        >
        {Object.keys(data).map((keys)=>{
          return(
            <AnyReactComponent
            text={data[keys].hostName}
            lat={data[keys].latitude}
            lng={data[keys].longitude}
            
          />
          );
        })}
          
        </GoogleMapReact>
      </div>
    );
}

 
export default SimpleMap;