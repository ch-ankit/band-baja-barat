import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux";
import "./History.css";
import HistoryProducts from "./HistoryProducts";

function History({ userId }) {
    const userData = useSelector(state => state.userData)
    const admin = useSelector(state => state.isAdmin)
    const uid = useSelector(state => state.uid)
    const { userName } = userData[0]
    const [data, setData] = useState([]);
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('')
    let orders = [];
    useEffect(() => {
        const historyUrl = admin ? "http://localhost:9000/giftstore/orders?userName=admin" : `http://localhost:9000/giftstore/orders?userName=${userName}`
        async function fetchHistory() {
            const response = await fetch(
                historyUrl
            );
            const { data } = await response.json();
            setHistory(data);
        }
        async function fetchData() {
            const res = await fetch("http://localhost:9000/giftstore/product");
            const { data } = await res.json();
            setData(data);
        }
        fetchData();
        fetchHistory();
    }, [message]);
    if (history !== undefined && history.length !== 0) {
        history.forEach(element => {
            const index = Object.keys(data).findIndex(items => data[items].modelNo === element.giftId)
            index !== -1 && orders.push({ ...element, image: data[index].photo, rating: data[index].rating, name: data[index].name })
        })
    }
    const setMsg = (msg) => {
        setMessage(msg)
    }
    const display = Object.keys(orders).map(items =>
        <HistoryProducts
            key={uuidv4()}
            orderNo={orders[items].orderNo}
            rating={orders[items].rating}
            title={orders[items].name}
            image={orders[items].image}
            price={orders[items].price}
            eventId={orders[items].eventId}
            orderedDate={orders[items].orderedDate}
            orderedQuantity={orders[items].quantity}
            status={orders[items].orderStatus}
            occasion={orders[items].eventName}
            msgFunction={setMsg}
            deliveryDate={orders[items].eventDate}
            location={orders[items].location}
            userName={orders[items].userName}
        />)
    return (
        <div className="historz">
            <img className="history__ad" src="https://laz-img-cdn.alicdn.com/images/ims-web/TB1os6RgSslXu8jSZFuXXXg7FXa.jpg_1200x1200Q100.jpg" alt="history__ad" />
            {history !== undefined && history.length === 0 ? (
                <div>
                    <h2>Your have not bought any gifts</h2>
                    <p>
                        You have no items in your history. To add one go and purchase an item
                    </p>
                </div>
            ) : (
                    <div>
                        <h2 className="History__title">Your History</h2>
                    </div>
                )}
            <div className="products__display">{display}</div>
        </div>
    );
}

export default History;
