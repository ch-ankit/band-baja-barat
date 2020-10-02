import React from 'react'
import { useEffect, useState } from 'react'
import { db, storage, auth } from './firebaseConfig'
import firebase from 'firebase'
import './Gallery.css'
import { useSelector } from 'react-redux'

function Gallery() {
    const [Progress, setProgress] = useState(0);
    const [posts, setposts] = useState([]);
    const [Url, setUrl] = useState('');
    const [image, setimage] = useState(null);
    const [Email, setEmail] = useState('');
    const [Photo, setPhoto] = useState(null)
    const vatNo = useSelector(state => state.vatNo)
    const [Caption, setCaption] = useState('')
    const [Dummy, setDummy] = useState(false)
    // useEffect(()=>{
    //     db.collection('gallery').orderBy("timestamp","desc").onSnapshot(snapshot=>{
    //       setposts(snapshot.docs.map(doc=>({
    //         id: doc.id,
    //         post: doc.data(),
    //       }) ));
    //     })
    //   },[]);
    //Hardcoded
    useEffect(() => {
        async function getHostData() {
            const response = await fetch(`http://localhost:9000/host?vatNo=${vatNo}`);
            const allData = await response.json();
            setPhoto(allData.rows2 ?? []);

        }
        getHostData();
    }, [vatNo])

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
                        setUrl(url);
                        console.log(url);
                        async function addPhoto(params) {
                            const response = await fetch('http://localhost:9000/host/addphoto', {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    "vatNo": vatNo,
                                    "caption": Caption,
                                    'photo': url
                                })
                            })
                        }
                        addPhoto();
                    }));
                // window.location.reload()
                setProgress(0);
                setDummy(!Dummy);
                setimage(null);
            }
        );
    }
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setimage(e.target.files[0])
        }
    };

    return (

        <div className="Gallery">
            <h1>Gallery</h1>
            <input type='text' placeholder='Caption' value={Caption} onChange={(e) => setCaption(e.target.value)} />
            <progress value={Progress} max='100' />
            <input type='file' onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>

            <div className='gallery__images'>
                {console.log(posts)}
                {Object.keys(Photo ?? []).map((keys) => (

                    <img key={keys} src={Photo[keys].photo} className='gallery__imageCard' />
                ))}
            </div>
        </div>
    )
}

export default Gallery
