import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { auth, storage, db } from './firebaseConfig'
import firebase from "firebase"
import './SignUp.css'
function SignUp({ }) {
    const [Address, setAddress] = useState('');
    const [Email, setEmail] = useState("");
    const [image, setimage] = useState(null);
    const [Progress, setProgress] = useState(0);
    const [userName, setuserName] = useState('Babin');
    const [Url, setUrl] = useState('');
    const [Password, setPassword] = useState('');
    const [contactInfo, setcontactInfo] = useState(null);
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setimage(e.target.files[0]);
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
                        db.collection("images").add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imgUrl: url,
                                userName: userName
                            }
                        )
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
        <div className="signUp">
            <h1>Sign Up</h1>
            <div className="signUp__nav">
                <h3>User</h3>
                <h3>Host</h3>
            </div>
            <div className="signUp__middlepart">
                <div className="signUp__input">
                    <label>User Name</label>
                    <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} required />
                    <br /><label>Email</label>
                    <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                    <br /><label>Password</label>
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    <br /><label>Contact info</label>
                    <input type='number' value={contactInfo} onChange={(e) => setcontactInfo(e.target.value.substring(0, 10))} />
                    <br /><label>Address</label>
                    <input type="text" value={Address} onChange={(e) => setAddress(e.target.value)} />
                    <br /><label>Profile Photo</label>
                    <progress value={Progress} max="100" />
                    <input type="file" onChange={handleChange} />
                </div>
                <Button className="signUp__button" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </div>
            <img src={Url} alt="image" />
        </div>
    )
}

export default SignUp;
