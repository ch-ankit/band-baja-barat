import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import shop from "./images/shop.jpg";
import shop2 from "./images/shop2.jpg";
import shop3 from "./images/shop3.png";

import "./Home.css";
import Product from "./Product";
import Header from "./Header";

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

  const show = Object.keys(data).map((keys) => (
    <Product
      id={data[keys].modelNo}
      title={data[keys].name}
      image={data[keys].photo}
      price={data[keys].price}
      description={data[keys].description}
      quantity={data[keys].quantity}
      rating={data[keys].rating}
      removeFun={removeFun}
    />
  ));
  //Present in prevdata or in data the responses we want.
  return (
    <div className="home">
      <Header />
      <ControlledCarousel />
      <div className="home__row">
        {show}
      </div>
    </div>
  );
}

export default Home;
