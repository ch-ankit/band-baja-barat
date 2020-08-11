import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import shop from "./images/shop.jpg";
import shop2 from "./images/shop2.jpg";
import shop3 from "./images/shop3.png";
import gagri from "./images/gagri khadkulo.jpg";
import karuwa from "./images/karuwa.jpg";
import fridge from "./images/fridge.jpg";
import vacuum from "./images/vacuum.jpeg";
import kitchen from "./images/kitchen.jpg";

import "./Home.css";
import Product from "./Product";

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
  let res;
  let [data, setData] = useState({ data: null })
  useEffect(() => {
    async function fetchData() {
      res = await fetch("http://localhost:9000/giftstore/product")
      const send = await res.json();
      setData(send.data);
    }
    fetchData();
  }, [])
  console.log(data)
  //Present in prevdata or in data the responses we want.
  return (
    <div className="home">
      <ControlledCarousel />
      {/* <img
                className="home__image"
                src="https://m.media-amazon.com/images/G/01/digital/video/sonata/US_SVOD_NonPrime_Banner/f69c4124-8751-4646-b8de-14e68f14ff8e._UR3000,600_SX1500_FMwebp_.jpg" alt="" />
             */}

      <div className="home__row">
        <Product
          id={12345}
          title="Gagri Khadkulo Set"
          price={5000}
          rating={5}
          image={gagri}
        />
        <Product
          id={12345}
          title="Kitchen Set- Exquisite China Chips"
          price={5000}
          rating={5}
          image={kitchen}
        />
      </div>
      <div className="home__row">
        <Product
          id={12345}
          title="Silver Karuwa-2 Tola"
          price={5000}
          rating={5}
          image={karuwa}
        />
        <Product
          id={12345}
          title="Bajaj Kitchen Robust Mixers"
          price={5000}
          rating={5}
          image="https://prilin.com/wp-content/uploads/2020/01/Bajaj-Glory-500-1.jpg"
        />
        <Product
          id={12345}
          title="Colors Vacuum Cleaner-4500W"
          price={5000}
          rating={5}
          image={vacuum}
        />
      </div>
      <div className="home__row">
        <Product
          id={12345}
          title="Samsung 55'' UHD Curved Smart TV"
          price={5000}
          rating={5}
          image="https://image-us.samsung.com/SamsungUS/home/televisions-and-home-theater/tvs/uhd-tv/ru7300/gallery/01_RU7300-L-Perspective-Black-031519.jpg?$product-details-jpg$"
        />
        <Product
          id={12345}
          title="LG Smart Refrigiratore-4000W"
          price={5000}
          rating={5}
          image={fridge}
        />
      </div>
    </div>
  );
}

export default Home;
