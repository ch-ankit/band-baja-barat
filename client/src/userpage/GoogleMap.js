import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Button from 'react-bootstrap/Button'
import './GoogleMap.css'
 
const AnyReactComponent = ({ text }) => <div>
    <Button style={{width:'10px',fontSize:'10px',display:'flex',alignContent:'flex-start'}}>{text}</Button>
  </div>
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 27.6758528,
      lng: 85.3671936,
    },
    zoom: 14
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="googleMap">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA7TVORrDdi2WUm4l2GSkWIVqyq8AovX7U'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            text='marker'
            lat={27.6758528}
            lng={85.3671936}
            
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;