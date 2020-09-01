import React from 'react'
import { useEffect, useState } from 'react'
import {db,storage,auth} from './firebaseConfig'
import firebase from 'firebase'
import './Gallery.css'

function Gallery() {
    const [Progress, setProgress] = useState(0);
    const [posts, setposts] = useState([]);
    const [Url, setUrl] = useState('');
    const [image, setimage] = useState(null);
    const [Email, setEmail] = useState('');
    useEffect(()=>{
        db.collection('gallery').orderBy("timestamp","desc").onSnapshot(snapshot=>{
          setposts(snapshot.docs.map(doc=>({
            id: doc.id,
            post: doc.data(),
          }) ));
        })
      },[]);

      const handleUpload=()=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=Math.round(
                    (snapshot.bytesTransferred /snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url=>{
                        setUrl(url);
                        console.log(url);
                        db.collection("gallery").add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                imgUrl:url
                            }
                        )
                    }));
                    setProgress(0);
                    setimage(null);
            }
        );
      }
        const handleChange=(e)=>{
            e.preventDefault();
            if(e.target.files[0]){
                setimage(e.target.files[0])
            }
        };
    
    return (
        
        <div className="Gallery">
            <h1>Gallery</h1>
            <input type='text' placeholder='Caption' />
            <progress value={Progress} max='100'/>
            <input type='file'  onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>

            <div className='gallery__images'>
            {console.log(posts)}
            {posts.map(({id,post})=>(
        
        <img key={id} src={post.imgUrl} className='gallery__imageCard' />
      ))}
            </div>
        </div>
    )
}

export default Gallery
