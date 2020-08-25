import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Product from "./Product";
import './SearchDisplay.css'

function SearchDisplay({ location }) {
    const [searchedData, setSearchedData] = useState([])
    let [Productdata, setProductData] = useState([]);
    let [newData, setnewData] = useState({ data: [] });
    const searchQuery = location.search.slice(7, location.search.length)
    let displaySearched = [];
    useEffect(() => {
        async function search() {
            const response = await fetch(`http://localhost:9000/giftstore/search?value=${searchQuery}`)
            const { data } = await response.json()
            setSearchedData(data)
        }
        search()
    }, [searchQuery])
    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://localhost:9000/giftstore/product");
            const { data } = await res.json();
            setProductData(data);
        }
        fetchData();
    }, [newData]);
    const removeFun = async (removedData) => {
        const removed = { modelNo: removedData.modelNo }
        const returned = await fetch('http://localhost:9000/giftstore/product', {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(removed)
        })
        const response = await returned.json()
        alert(`${response.message}`)
        setnewData(response.message)
    }
    if (searchedData !== undefined && Productdata[0] !== undefined) {
        searchedData.forEach(element => {
            const index = Object.keys(Productdata).findIndex(item => element.modelNo === Productdata[item].modelNo)
            if (index !== -1) {
                displaySearched.push(
                    <Product
                        key={uuidv4()}
                        id={Productdata[index].modelNo}
                        title={Productdata[index].name}
                        image={Productdata[index].photo}
                        price={Productdata[index].price}
                        description={Productdata[index].description}
                        quantity={Productdata[index].quantity}
                        rating={Productdata[index].rating}
                        removeFun={removeFun}
                    />)
            }
        })
    }
    return (
        <div className="searchPage">
            <span>Search result for "{searchQuery}"</span>
            <div className="searcheditems">
                {searchedData.length !== 0 ? displaySearched : <span>💥💥 No such products found in Store!! 💥💥</span>}
            </div>
        </div>
    );
}

export default SearchDisplay;