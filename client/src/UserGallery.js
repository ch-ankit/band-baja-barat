import React from 'react'
import { useEffect, useState } from 'react'
import { db, storage, auth } from './firebaseConfig'
import firebase from 'firebase'
import './UserGallery.css'
import {useSelector} from 'react-redux'

function Gallery() {
    const vatNo = useSelector(state => state.vatNo)
    const [Photo, setPhoto] = useState([])
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
    }, [])

    return (

        <div className="userGallery">
            <h1>Gallery</h1>
            <div className='userGallery__images'>
                {Object.keys(Photo ?? []).map((keys) => (

                    <img key={keys} src={Photo[keys].photo} className='userGallery__imageCard' />
                ))}
            </div>
        </div>
    )
}

export default Gallery
