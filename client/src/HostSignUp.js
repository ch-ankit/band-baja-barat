import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Hstorage, Hauth } from './hostFirebaseConfig';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import mapStyles from "./mapStyles";

function HostSignUp() {
    const [Street, setStreet] = useState('');
    const [City, setCity] = useState('');
    const [Province, setProvince] = useState('');
    const [image, setimage] = useState(null);
    const [Progress, setProgress] = useState(0);
    const [Url, setUrl] = useState(null)
    const [hostName, sethostName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('')
    const [contactInfo, setcontactInfo] = useState('');
    const [vatNo, setvatNo] = useState('')
    const [Markers, setMarkers] = useState([])
    const [selected, setSelected] = React.useState(null);
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('')
    const [viewFile, setViewFile] = useState(null);

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyA7TVORrDdi2WUm4l2GSkWIVqyq8AovX7U",
        libraries,
    });
    const mapContainerStyle = {
        height: "50vh",
        width: "100vw",
    };
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    };
    const center = {
        lat: 43.6532,
        lng: -79.3832,
    };
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setimage(e.target.files[0]);
            setViewFile(URL.createObjectURL(e.target.files[0]))
            console.log(image)
        }

    }
    const onMapClick = React.useCallback((e) => {
        setMarkers(
            [{
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            }],
        );
    }, []);
    const handleUpload = () => {
        const uploadTask = Hstorage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                Hstorage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url => {
                        alert('hello')
                        setUrl(url);
                        console.log(url);
                        /*db.collection("images").add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imgUrl: url,
                                userName: userName
                            }
                        )*/
                        alert('Hello world')
                        async function sign() {
                            alert('yes')
                            const response = await fetch('http://localhost:9000/signup/host', {
                                body: JSON.stringify({
                                    vatNo: vatNo,
                                    hostName: hostName,
                                    profilePhoto: url,
                                    email: Email,
                                    contactInfo: contactInfo,
                                    latitude: latitude,
                                    longitude: longitude,
                                    totalHalls: 3,
                                    city: City,
                                    street: Street,
                                    provience: Province
                                }),
                                headers: { "Content-type": "application/json" },
                                method: "post"
                            });
                            console.log(response)
                        }
                        sign();
                    }));
                setProgress(0);
                setimage(null);

            }
        );

    }
    const handleSignUp = (event) => {
        event.preventDefault();
        Hauth.createUserWithEmailAndPassword(Email, Password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: hostName
                });
                handleUpload();
            })
            .catch(error => alert(error.message))
    };
    console.log(viewFile)
    return (
        <div className='hostSignUp'>
            <div className="signUp__input">
                <div className="signUp__userPass">
                    <div>
                        <label>Host Name</label><br />
                        <input type="text" value={hostName} onChange={(e) => sethostName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Vat Number</label><br />
                        <input type="number" value={vatNo} onChange={(e) => setvatNo(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password</label><br />
                        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="signUp__contactInfo">
                    <div>
                        <label>Email</label><br />
                        <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Contact info</label><br />
                        <input type='number' value={contactInfo} onChange={(e) => setcontactInfo(e.target.value.substring(0, 10))} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <label>Latitude</label><br />
                        <input type='number' step="any" />
                    </div>
                    <div>
                        <label>Longitude</label><br />
                        <input type='number' step="anys" />
                    </div>

                </div>
                <div className="signUp__Address">
                    <div>
                        <label>Street</label><br />
                        <input type="text" value={Street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div>
                        <label>City</label><br />
                        <input type="text" value={City} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label>Province</label><br />
                        <input type="text" value={Province} onChange={(e) => setProvince(e.target.value)} />
                    </div>
                </div>
                <br /><label>Profile Photo</label>
                <progress value={Progress} max="100" />
                <input type="file" onChange={handleChange} />
                {viewFile !== null && <div style={{ backgroundColor: 'white', height: '500px' }}><img src={viewFile} style={{ display: 'flex', marginTop: 'auto', marginBottom: 'auto', justifyContent: 'center', height: "300px", width: "300px" }} alt="host" /></div>}
            </div>
            <Button className="signUp__button" onClick={handleSignUp}>
                Sign Up
                </Button>

        </div>
    )
}

export default HostSignUp
