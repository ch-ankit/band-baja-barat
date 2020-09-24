import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { auth, storage, db } from './firebaseConfig'
import firebase from "firebase"
import './SignUp.css'
import Header from './HeaderHome'
import HostSignUp from './HostSignUp'
function SignUp({ }) {
    const [Address, setAddress] = useState('');
    const [Email, setEmail] = useState("");
    const [image, setimage] = useState(null);
    const [Progress, setProgress] = useState(0);
    const [userName, setuserName] = useState('');
    const [Url, setUrl] = useState('');
    const [Password, setPassword] = useState('');
    const [contactInfo, setcontactInfo] = useState(null);
    const [Street, setStreet] = useState('');
    const [City, setCity] = useState('');
    const [Province, setProvince] = useState('');
    const [firstName, setfirstName] = useState('');
    const [middleName, setmiddleName] = useState('');
    const [lastName, setlastName] = useState('');
    const [Hostsign, setHostsign] = useState(false);
    const [viewFile, setViewFile] = useState(null);

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setimage(e.target.files[0]);
            setViewFile(URL.createObjectURL(e.target.files[0]))
            console.log(image)
        }

    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                storage
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
                        async function sign() {
                            const response = await fetch('http://localhost:9000/signup/user', {
                                body: JSON.stringify({
                                    firstName: firstName,
                                    middleName: middleName,
                                    lastName: lastName,
                                    userName: userName,
                                    email: Email,
                                    mobileNo: contactInfo,
                                    street: Street,
                                    city: City,
                                    provience: Province,
                                    photo: url
                                }),
                                headers: { "Content-type": "application/json" },
                                method: "post"
                            });
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
        auth.createUserWithEmailAndPassword(Email, Password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: userName
                });
                handleUpload();
            })
            .catch(error => alert(error.message))
    };
    return (
        <div>
            <Header />
            <div className="signUp">
                <h1>Sign Up</h1>
                <div className="signUp__nav">
                    <h3 onClick={() => setHostsign(false)}>User</h3>
                    <h3 onClick={() => setHostsign(true)}>Host</h3>
                </div>
                {Hostsign ? <HostSignUp /> :
                    (<div className="signUp__middlepart">
                        <div className="signUp__input">
                            <div className='signUp__name'>
                                <div>
                                    <label>First Name</label><br />
                                    <input type='text' value={firstName} onChange={(e) => setfirstName(e.target.value)} required />
                                </div>
                                <div>
                                    <label>Middle Name</label><br />
                                    <input type='text' value={middleName} onChange={(e) => setmiddleName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Last Name</label><br />
                                    <input type='text' value={lastName} onChange={(e) => setlastName(e.target.value)} required />
                                </div>

                            </div>
                            <div className="signUp__userPass">
                                <div>
                                    <label>User Name</label><br />
                                    <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} required />
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
                    </div>)}
            </div>
        </div>
    )
}

export default SignUp;
