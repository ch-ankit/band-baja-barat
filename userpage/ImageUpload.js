import React, { useState } from 'react'
import {db,storage} from './firebaseConfig';
import { Button } from '@material-ui/core';
import firebase from "firebase"

function ImageUpload() {
    const [image, setimage] = useState(null);
    const [url, seturl] = useState("");
    const [Progress, setProgress] = useState(0);
    const handleChange=(e)=>{
        e.preventDefault();
        if(e.target.files[0]){
            setimage(e.target.files[0]);
        }
    }
    const handleUpload=()=>{
        const uploadTask=storage.ref(`images/ ${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress);
            },
            (error)=>{
                alert(error.message)
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url => {
                    alert("Hello")
                    console.log(url);
                    db.collection("images").add(
                        {
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            imgUrl:url,
                        }
                    )
                }));
                setProgress(0);
            }

        );
       
    }
    return (
        <div className="image_Upload">
            <progress value={Progress} max="100"/><br/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        <br />
            <img src={url} alt="img" />
    <h1>{url}</h1>
        </div>
    )
}

export default ImageUpload
