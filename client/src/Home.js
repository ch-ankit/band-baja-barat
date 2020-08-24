import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

import Carousel from "react-bootstrap/Carousel";
import shop from "./images/shop.jpg";
import shop2 from "./images/shop2.jpg";
import shop3 from "./images/shop3.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'; import "./Home.css";
import Product from "./Product";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="home">
      <Carousel
        className="carousal"
        activeIndex={index}
        onSelect={handleSelect}
      >
        <Carousel.Item>
          <img className="home__image" src={shop} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__image" src={shop2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="home__image" src={shop3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

function Home(props) {
  const [{ isAdmin }] = useStateValue()
  let [data, setData] = useState({ data: [] });
  let [newData, setnewData] = useState({ data: [] });
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:9000/giftstore/product");
      const send = await res.json();
      setData(send.data);
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
  let show;
  if (data[0] !== undefined) {
    show = Object.keys(data).map((keys) => {
      return <Product
        key={uuidv4()}
        id={data[keys].modelNo}
        title={data[keys].name}
        image={data[keys].photo}
        price={data[keys].price}
        description={data[keys].description}
        quantity={data[keys].quantity}
        rating={data[keys].rating}
        removeFun={removeFun}
      />
    }
    );
  }
  const adminAddProduct = (
    <Link to='/giftstore/product/add' className="home__addProduct" style={{ textDecoration: 'none', color: 'teal' }}>
      <span><AddCircleOutlineIcon style={{ fontSize: '90px', color: 'teal' }} /></span>
      <div>Add Product</div>
    </Link>
  )
  return (
    <div className="home">
      <Header />
      <ControlledCarousel />
      <div className="home__row">
        {isAdmin && adminAddProduct}
        {show}
      </div>
    </div>
  );
}

export default Home;
