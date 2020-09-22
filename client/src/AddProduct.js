import React, { useState, useEffect } from 'react';
import './AddProduct.css'
import { storage, db } from './firebaseConfig'
import firebase from "firebase"


function AddProduct({ history }) {
    const [image, setImage] = useState(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(1)
    const [description, setDescription] = useState([])
    const [summary, setSummary] = useState([])
    const [modelNo, setModelNo] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [url, setUrl] = useState('');
    const [viewFile, setViewFile] = useState(null);
    const [progress, setProgress] = useState(0);
    /////////////////////////////////////////
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
                                modelNo: modelNo
                            }
                        )
                    }));
                setProgress(0);
                setImage(null);
            }
        );

    }
    useEffect(() => {
        if (url !== '') {
            async function addProduct() {
                console.log(summary)
                let summaryToBackend;
                if (summary) {
                    summaryToBackend = summary[0].split("\u2022").join('')
                }
                const data = {
                    modelNo: modelNo,
                    price: price,
                    quantity: quantity,
                    description: description,
                    photo: url,
                    name: name,
                    summary: summaryToBackend
                }
                const response = await fetch('http://localhost:9000/giftstore/product',
                    {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                const { message } = await response.json();
                console.log(message)
            }
            addProduct();
            setTimeout(() => history.push('/giftstore'), 1000)
        }
    }, [url])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleUpload();
    }

    const handleKey = (evt) => {
        const bullet = "\u2022";
        const bulletWithSpace = `${bullet} `;
        const enter = 13;
        const { keyCode, target } = evt;
        const { selectionStart, value } = target;

        if (keyCode === enter) {
            target.value = [...value]
                .map((c, i) => i === selectionStart - 1
                    ? `\n${bulletWithSpace}`
                    : c
                )
                .join('');
            target.selectionStart = selectionStart + bulletWithSpace.length;
            target.selectionEnd = selectionStart + bulletWithSpace.length;
            setSummary(target.value)
        }
        if (value[0] !== bullet) {
            target.value = `${bulletWithSpace}${value}`;
        }

    }
    const displayImage = viewFile !== null && <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", width: "100%", height: "40vh", marginBottom: "60px" }}>
        <img src={viewFile} style={{ marginTop: "auto", marginBottom: "auto", height: "200px", width: "300px", objectFit: "contain" }} />
    </div>
    ///////////////////////////////////////
    return (
        <div className="addProduct">
            <form className="addProduct__form" id="productForm" onSubmit={handleSubmit}>
                <label className="addProduct__title" >
                    <span>Name:</span>
                    <input class="form-control form-control-lg" value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} type='text' placeholder='Name of product' />
                </label>
                <label className="addProduct__price">
                    <span>Price:</span>
                    <input class="form-control" type='number' placeholder='Price' min="0" value={price} onChange={(event) => setPrice(event.target.valueAsNumber)} />
                </label>
                <label className="addProduct__modelNo">
                    <span>Model Number:</span>
                    <input class="form-control" type='text' placeholder='Enter the Model number' value={modelNo} onChange={(event) => setModelNo(event.target.value)}
                    />
                </label>
                <label className="addProduct__description" style={{ height: "30vh" }}>
                    <span>Description:</span>
                    <textarea class="form-control" style={{ height: "100%" }} type='text' placeholder='Enter the product Description' value={description} onChange={(event) => setDescription([event.target.value])}
                    />
                </label>
                <label className="addProduct__description" style={{ height: "40vh" }}>
                    <span>Product Summary (In Points):</span>
                    <textarea class="form-control" style={{ height: "100%" }} type='text' placeholder='Enter the product Description' value={summary} onKeyUp={handleKey} onChange={(event) => setSummary([event.target.value])}
                    />
                </label>
                <label className="addProduct__quantity">
                    <span>Quantity:</span>
                    <input class="form-control" type='number' placeholder='Quantity' min="1" value={quantity} onChange={(event) => setQuantity(event.target.valueAsNumber)} />
                </label>
                {progress !== 0 && <progress max="100" value={progress} />}
                <input type="file" onChange={handleChange} accept='image/*' id="inputButton" hidden />
                <button className="btn btn-primary" style={{ marginBottom: "10px", width: "150px" }} type="button">
                    <label htmlFor="inputButton">
                        Select Image
                    </label>
                </button>
                {displayImage}
                <button className="btn btn-primary" style={{ width: "30vw", marginBottom: "40px" }} type="submit" form="productForm">Submit</button>
            </form>
            {url !== '' && <img src={url} alt='uploaded' />}
        </div>
    );
}

export default AddProduct;