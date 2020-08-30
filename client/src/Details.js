import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./Details.css";
import { useStateValue } from "./StateProvider";

function Details({ location }) {
    const [{ isAdmin, user }, dispatch] = useStateValue();
    const [details, setDetails] = useState({});
    const [addedQuantity, setAddedQuantity] = useState(1);
    const [productRating, setproductRating] = useState([]);
    const [userBasket, setUserBasket] = useState([]);
    const [edit, setEdit] = useState(false);
    const [prodRating, setProdRating] = useState(0);
    const [editableDescription, setEditabledescription] = useState("");
    const query = location.search.slice(9, location.search.length);
    useEffect(() => {
        async function productRating() {
            const response = await fetch(
                `http://localhost:9000/giftstore/rating?userName=${user.userName}&modelNo=${query}`
            );
            const newRating = await response.json();
            if (newRating.data.length !== 0) {
                setproductRating(newRating.data);
            }
        }
        async function productDetail() {
            const response = await fetch(
                `http://localhost:9000/giftstore/product?modelNo=${query}`
            );
            const { data } = await response.json();
            let { modelNo, photo, description, price, name, rating } = data[0];
            setEditabledescription(description);
            setDetails({
                modelNo,
                photo,
                description,
                price,
                title: name,
                rating,
            });
        }
        productDetail();
        productRating();
    }, [prodRating]);

    //Fetching Basket of the user
    useEffect(() => {
        async function getBasket() {
            const response = await fetch(
                `http://localhost:9000/giftstore/basket?userName=${user.userName}`
            );
            const { data } = await response.json();
            setUserBasket(data);
        }
        getBasket();
    }, [addedQuantity]);

    //Update or Add rating of the user
    const updateRating = async (data) => {
        let name = "POST";
        if (productRating.length !== 0) {
            name = "PATCH";
        }
        await fetch(
            `http://localhost:9000/giftstore/rating?modelNo=${details.modelNo}&userName=${user.userName}`,
            {
                method: name,
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ value: data.rating }),
            }
        );
    };

    //Check if the item is on basket and add to the basket
    const addToBasket = async () => {
        let totalPrice = addedQuantity * details.price;
        let name = "POST";
        let prevQuantity = 0;
        if (userBasket.length !== 0) {
            const index = Object.keys(userBasket).findIndex(
                (item) => userBasket[item].modelNo === details.modelNo
            );
            index === -1 ? (name = "POST") : (name = "PATCH");
            index === -1
                ? (prevQuantity = 0)
                : (prevQuantity = userBasket[index].quantity);
        }
        const basketToDb = {
            userName: user.userName,
            modelNo: details.modelNo,
            quantity: addedQuantity + prevQuantity,
        };
        await fetch("http://localhost:9000/giftstore/basket", {
            method: name,
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(basketToDb),
        }).then((res) => {
            res.json();
            console.log(res);
        });
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: details.id,
                title: details.title,
                image: details.image,
                price: totalPrice,
                rating: details.rating,
                quantity: addedQuantity,
            },
        });
        setAddedQuantity(1);
    };

    const addQuantity = () => {
        let newQuantity = addedQuantity + 1;
        setAddedQuantity(newQuantity);
    };

    const removeQuantity = () => {
        let newQuantity = addedQuantity <= 1 ? 1 : addedQuantity - 1;
        setAddedQuantity(newQuantity);
    };

    //Implementing not clickable subtract button when quantity is 1
    const removeIcon =
        addedQuantity <= 1 ? (
            <div onClick={removeQuantity} className="disabled">
                <RemoveIcon />
            </div>
        ) : (
                <div onClick={removeQuantity}>
                    <RemoveIcon />
                </div>
            );

    //Populating the rating with the user's rating
    const star = Object.keys(productRating).map((item) => (
        <ReactStars
            count={5}
            value={productRating[item].value}
            color="gray"
            activeColor="#ffd700"
            edit={true}
            isHalf={true}
            onChange={(newRating) => {
                const data = { modelNo: details.modelNo, rating: newRating };
                setProdRating(newRating);
                updateRating(data);
            }}
        />
    ));

    //Updating the Product details by the admin
    const handleSubmit = async (event) => {
        event.preventDefault();
        // const response = await fetch(
        //     "http://localhost:9000/giftstore/product",
        //     {
        //         method: "PATCH",
        //         headers: {
        //             "Content-type": "application/json",
        //         },
        //         body: JSON.stringify()
        //     }
        // );
        setEdit(!edit);
    };


    return (
        <div>
            <div className="details">
                <div className="details__body">
                    <div className="details__image">
                        <img src={details.photo} alt="product" />
                    </div>
                    <div className="details__description">
                        <h2>{details.title}</h2>
                        <div className="rating">
                            {!isAdmin &&
                                (productRating.length !== 0 ? (
                                    star
                                ) : (
                                        <ReactStars
                                            count={5}
                                            value={0}
                                            color="gray"
                                            activeColor="#ffd700"
                                            edit={true}
                                            isHalf={true}
                                            onChange={(newRating) => {
                                                const data = {
                                                    modelNo: details.modelNo,
                                                    rating: newRating,
                                                };
                                                setProdRating(newRating);
                                                updateRating(data);
                                            }}
                                        />
                                    ))}
                            <span>Average Rating: {details.rating}</span>
                        </div>
                        <p className="price">
                            <small>Rs.</small>
                            <small>{details.price}</small>
                        </p>
                        {edit ? (
                            <form
                                className="descriptionForm"
                                onSubmit={handleSubmit}
                            >
                                <textarea
                                    class="form-control"
                                    type="text"
                                    value={editableDescription}
                                    onChange={(e) =>
                                        setEditabledescription(e.target.value)
                                    }
                                />
                                <button class="btn btn-primary">Save</button>
                            </form>
                        ) : (
                                <p>{details.description}</p>
                            )}
                        {isAdmin &&
                            (edit ? (
                                <button
                                    type="submit"
                                    onClick={() => setEdit(!edit)}
                                    hidden
                                >
                                    Save
                                </button>
                            ) : (
                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                        onClick={() => setEdit(!edit)}
                                    >
                                        Edit
                                    </button>
                                ))}

                        <div className="product__quantity">
                            <p>Quantity:</p>
                            <div className="product__quantityView">
                                {removeIcon}
                                <span>{addedQuantity}</span>
                                <div onClick={addQuantity}>
                                    <AddIcon />
                                </div>
                            </div>
                        </div>
                        {!isAdmin && (
                            <button onClick={addToBasket}>Add to Basket</button>
                        )}
                    </div>
                </div>
            </div>
            <div className="tech__details">
                Product Description For {details.title}
                <div className="Description"></div>
            </div>
        </div>
    );
}

export default Details;
