import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ReactImageMagnify from 'react-image-magnify';
import "./Details.css";
import { useStateValue } from "./StateProvider";
import { useSelector } from "react-redux";
//Hello Worldz

function Details({ location }) {
    const [{ isAdmin, user }, dispatch] = useStateValue();
    const [eventId, setEventId] = useState()

    const userData = useSelector(state => state.userData);
    const { userName } = userData[0];
    const [details, setDetails] = useState({});
    const [addedQuantity, setAddedQuantity] = useState(1);
    const [productRating, setproductRating] = useState([]);
    const [userBasket, setUserBasket] = useState([]);
    const [editDescription, setEditDescription] = useState(false);
    const [editPrice, setEditPrice] = useState(false);
    const [editablePrice, setEditablePrice] = useState(0);
    const [editQuantiy, setEditQuantity] = useState(false);
    const [editableQuantity, setEditableQuantity] = useState(0);
    const [prodRating, setProdRating] = useState(0);
    const [editableDescription, setEditabledescription] = useState("");
    const [updateMessage, setUpdateMessage] = useState('')
    const [editSummary, setEditSummary] = useState(false)
    const [editableSummary, setEditablesummary] = useState("");
    const [invitations, setInvitations] = useState([])



    const query = location.search.slice(9, location.search.length);
    let productSummary = []

    useEffect(() => {
        async function getInvitations() {
            const response = await fetch(`http://localhost:9000/userhome/invitationrecieved?userName=${userName}`);
            const { data } = await response.json()
            setInvitations(data)
        }
        getInvitations();
    }, [])

    useEffect(() => {
        async function productRating() {
            const response = await fetch(
                `http://localhost:9000/giftstore/rating?userName=${userName}&modelNo=${query}`
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
            let { modelNo, photo, description, price, name, rating, quantity, summary } = data[0];
            setEditabledescription(description);
            setEditablePrice(price);
            setEditableQuantity(quantity);
            setEditablesummary(summary)
            setDetails({
                modelNo,
                photo,
                description,
                price,
                title: name,
                rating,
                quantity,
                summary
            });
        }
        productDetail();
        productRating();
    }, [prodRating, updateMessage]);

    //Fetching Basket of the user
    useEffect(() => {
        async function getBasket() {
            const response = await fetch(
                `http://localhost:9000/giftstore/basket?userName=${userName}`
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
            `http://localhost:9000/giftstore/rating?modelNo=${details.modelNo}&userName=${userName}`,
            {
                method: name,
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ value: data.rating }),
            }
        );
    };

    //Check if the item is on basket and add to the basket
    const addToBasket = async (evt) => {
        evt.preventDefault();
        let present = true;
        // const invites = Object.keys(invitations).map(items => invitations[items].eventId)
        // present = invites.includes(eventId)
        if (!present) {
            alert('Event Id does not match')
            return false
        }
        else {
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
                userName: userName,
                modelNo: details.modelNo,
                quantity: addedQuantity + prevQuantity,
                eventId: eventId
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
        }
    };

    if (details.hasOwnProperty('summary')) {
        productSummary = details.summary?.slice(0, details.summary.length - 1).split('\n').map(items =>
            <ul>
                <li>{items}</li>
            </ul>)
    }

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

    //Updating the Product description by the admin
    const handleSubmitDescription = async (event) => {
        event.preventDefault();
        const response = await fetch(
            "http://localhost:9000/giftstore/product",
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ modelNo: details.modelNo, description: editableDescription })
            }
        );
        const { message } = await response.json();
        setUpdateMessage(message)
        setEditDescription(!editDescription);
    };
    const handleSubmitPrice = async (event) => {
        event.preventDefault();
        const response = await fetch(
            "http://localhost:9000/giftstore/product",
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ modelNo: details.modelNo, price: editablePrice })
            }
        );
        const { message } = await response.json();
        setUpdateMessage(message)
        setEditPrice(!editPrice);
    };
    const handleSubmitQuantity = async (event) => {
        event.preventDefault();
        const response = await fetch(
            "http://localhost:9000/giftstore/product",
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ modelNo: details.modelNo, quantity: editableQuantity })
            }
        );
        const { message } = await response.json();
        setUpdateMessage(message)
        setEditQuantity(!editQuantiy);
    };
    const handleSubmitSummary = async (event) => {
        event.preventDefault();
        const store = editableSummary.split("\u2022").join('')
        const response = await fetch(
            "http://localhost:9000/giftstore/product",
            {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ modelNo: details.modelNo, summary: store })
            }
        );
        const { message } = await response.json();
        setUpdateMessage(message)
        setEditSummary(!editSummary);
    };

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
            setEditablesummary(target.value)
        }
        if (value[0] !== bullet) {
            target.value = `${bulletWithSpace}${value}`;
        }

    }

    return (
        <div>
            <div className="details">
                <div className="details__body">
                    <div className="details__image">
                        <ReactImageMagnify className="details__Magnify" style={{overflow:'visible'}} {...{
                            smallImage: {
                                alt: 'product image',
                                isFluidWidth: true,
                                src: details.photo,
                                className:'smallImages'
                            },
                            largeImage: {
                                src: details.photo,
                                height: 2000,
                                width: 1000,

                            },
                            enlargedImageContainerDimensions: {
                                width: '390%',
                                height: '330%',
                            }
                        }} />
                        {/* <img src={details.photo} alt="product" /> */}
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
                            <div className="price__display">
                                {editPrice ? (
                                    <form
                                        className="descriptionForm"
                                        onSubmit={handleSubmitPrice}
                                    >
                                        <input
                                            class="form-control"
                                            type="number"
                                            value={editablePrice}
                                            onChange={(e) =>
                                                setEditablePrice(e.target.value)
                                            }
                                        />
                                        <button class="btn btn-primary">Save</button>
                                    </form>
                                ) : (
                                        <small style={{ marginRight: '2px' }}>{details.price}</small>
                                    )}
                                <small> Store points</small>
                            </div>

                            {isAdmin &&
                                (editPrice ? (
                                    <button
                                        type="submit"
                                        onClick={() => setEditPrice(!editPrice)}
                                        hidden
                                    >
                                        Save
                                    </button>
                                ) : (
                                        <button
                                            class="btn btn-primary edits"
                                            type="submit"
                                            onClick={() => setEditPrice(!editPrice)}
                                        >
                                            Edit
                                        </button>
                                    ))}
                        </p>
                        {editDescription ? (
                            <form
                                className="descriptionForm"
                                onSubmit={handleSubmitDescription}
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
                            (editDescription ? (
                                <button
                                    type="submit"
                                    onClick={() => setEditDescription(!editDescription)}
                                    hidden
                                >
                                    Save
                                </button>
                            ) : (
                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                        onClick={() => setEditDescription(!editDescription)}
                                    >
                                        Edit
                                    </button>
                                ))}

                        <div className="product__quantity">
                            <p>Quantity:</p>
                            {!isAdmin ? (<div className="product__quantityView">
                                {removeIcon}
                                <span>{addedQuantity}</span>
                                <div onClick={addQuantity}>
                                    <AddIcon />
                                </div>
                            </div>) : (
                                    editQuantiy ? (
                                        <form
                                            className="descriptionForm"
                                            onSubmit={handleSubmitQuantity}
                                        >
                                            <input
                                                class="form-control"
                                                type="number"
                                                value={editableQuantity}
                                                onChange={(e) =>
                                                    setEditableQuantity(e.target.value)
                                                }
                                            />
                                            <button class="btn btn-primary">Save</button>
                                        </form>
                                    ) : (
                                            <p>{details.quantity}</p>
                                        )
                                )}
                            {isAdmin &&
                                (editQuantiy ? (
                                    <button
                                        type="submit"
                                        onClick={() => setEditQuantity(!editQuantiy)}
                                        hidden
                                    >
                                        Add to Stock
                                    </button>
                                ) : (
                                        <button
                                            class="btn btn-primary edits"
                                            type="submit"
                                            onClick={() => setEditQuantity(!editQuantiy)}
                                        >
                                            Edit
                                        </button>
                                    ))}

                        </div>
                        {!isAdmin && (
                            <div className="basket__control">
                                <button form="eventIdForm" type="submit" className="addBasket">Add to Basket</button>
                                <div className="event__id">
                                    <form id="eventIdForm" onSubmit={addToBasket}>
                                        <input data-toggle="popover" title="Please fill out this field" class="form-control" type="number" validate placeholder="Event id" onChange={(evt) => setEventId(evt.target.value)} value={eventId} required />
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="tech__details">
                Product Description For {details.title}
                <div className="Description">
                    {/* ///////////////////////// */}
                    {editSummary ? (
                        <form
                            className="descriptionForm"
                            onSubmit={handleSubmitSummary}
                        >
                            <textarea
                                class="form-control"
                                type="text"
                                onKeyUp={handleKey}
                                value={editableSummary}
                                onChange={(e) =>
                                    setEditablesummary(e.target.value)
                                }
                            />
                            <button class="btn btn-primary">Save</button>
                        </form>
                    ) : (
                            productSummary

                        )}
                    {isAdmin &&
                        (editSummary ? (
                            <button
                                type="submit"
                                onClick={() => setEditSummary(!editSummary)}
                                hidden
                            >
                                Save
                            </button>
                        ) : (
                                <button
                                    class="btn btn-primary"
                                    type="submit"
                                    onClick={() => setEditSummary(!editSummary)}
                                >
                                    Edit
                                </button>
                            ))}

                    {/* ////////////////////// */}
                </div>
            </div>
        </div>
    );
}

export default Details;
