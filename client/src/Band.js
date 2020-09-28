import React, { useEffect, useState } from 'react'
import DetailCard from './DetailCard'
import HeaderHome from './HeaderHome'
import "./Band.css"
import { useSelector } from 'react-redux';
import UserHeader from './UserHeader.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { storage, db } from './firebaseConfig'
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column'
        }
    },
    input: {
        display: 'none',
    },
}));

function Band() {
    const [viewFile, setViewFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState('');
    const [image, setImage] = useState(null)
    const [addClick, setAddClick] = useState(false)
    const [data, setdata] = useState([]);
    const [name, setName] = useState('')
    const [bandDescription, setBandDescription] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [email, setEmail] = useState('')
    const uid = useSelector(state => state.uid);
    const admin = useSelector(state => state.isAdmin)
    const classes = useStyles();
    useEffect(() => {
        async function getBandData() {
            const response = await fetch('http://localhost:9000/bbb/band');
            const allData = await response.json()
            setdata(allData.data)
        }
        getBandData();
    }, [])

    ////
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            if (e.target.files[0].type.match(/image-*/)) {
                setImage(e.target.files[0]);
                setViewFile(URL.createObjectURL(e.target.files[0]))
            }
            else {
                alert('Not an image file')
            }
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
                                bandName: name
                            }
                        )
                        async function addBand() {
                            await fetch('http://localhost:9000/band', {
                                method: 'POST',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    bandName: name,
                                    description: bandDescription,
                                    profilePhoto: url,
                                    contactInfo: mobileNo,
                                    email: email
                                })
                            })
                            setTimeout(() => window.location.reload(), 1000)
                        }
                        addBand()
                    }));
                setProgress(0);
                setImage(null);
            }
        );

    }
    ////
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        handleUpload();
    }
    return (
        <div>
            <div className="userPage__header">
                {uid ? <UserHeader /> : <HeaderHome />}
            </div>
            {(admin && !addClick) && <button className="btn btn-primary" onClick={() => setAddClick(true)}><strong>Add Band</strong></button>}
            <div className="band">
                {addClick &&
                    <form className="detailCard" style={{ transform: 'none' }} id="bandForm" onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className={classes.root}>
                                <strong>Picture of Band</strong>
                                <img src={viewFile !== null ? viewFile : ''} alt="" className="detailCard__image" />
                                <input type="file" className={classes.input} onChange={handleChange} accept='image/*' id="inputButton" required />
                                <label htmlFor="inputButton">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </div>
                            {progress !== 0 && <progress style={{ maxWidth: '20vw' }} max="100" value={progress} />}
                        </div>
                        <div className="detailCard__detail" style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                            <div><strong>Band Information</strong></div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label >
                                        <span>Name:</span>
                                        <input class="form-control form-control-md" value={name} onChange={(event) => {
                                            setName(event.target.value)
                                        }} type='text' placeholder='Name of Band' required />
                                    </label>
                                    <label style={{ height: "20vh" }}>
                                        <span>Description of Band:</span>
                                        <textarea class="form-control" style={{ height: "100%" }} type='text' placeholder='Description...' value={bandDescription} onChange={(event) => setBandDescription(event.target.value)}
                                            required />
                                    </label>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                                    <label className="mobile__number">
                                        <span>Contact:</span>
                                        <input class="form-control form-control-md" type='number' placeholder='Enter Mobile Number' value={mobileNo} onChange={(event) => setMobileNo(event.target.value.substring(0, 10))} required />
                                    </label>
                                    <label>
                                        <span>Email</span>
                                        <input class="form-control form-control-md" placeholder="Enter E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </label>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <button className="btn btn-primary" style={{ width: "20vw", marginTop: "20px" }} type="submit" form="bandForm">Submit</button>
                                <button className="btn btn-primary" style={{ width: "20vw", marginTop: "20px", marginLeft: '20px' }} onClick={() => setAddClick(false)} >Close</button>
                            </div>
                        </div>
                    </form>}
                {Object.keys(data).map((keys) => {
                    return (<DetailCard path='/bands' image={data[keys].profilePhoto} details={data[keys].description} name={data[keys].bandName} />)
                })}
            </div>
        </div>

    )
}

export default Band
