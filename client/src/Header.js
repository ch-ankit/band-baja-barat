import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { v4 as uuidv4 } from 'uuid'

import logo from "./images/logo.png";
import SearchDrop from "./SearchDrop";
import "./Header.css";

function Header(props) {
<<<<<<< HEAD
  const [{ basket, user }, dispatch] = useStateValue();
  const [inputSearch, setInputSearch] = useState("");
  const [basketData, setBasketData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  let totalItems = 0;
=======
  const [{ basket, user }] = useStateValue();
  const [inputSearch, setInputSearch] = useState('')
  const [focus, setFocus] = useState(false)
  const [basketData, setBasketData] = useState([])
  const [searchedData, setSearchedData] = useState([])
  const [searchDropFocus, setSearchdropfocus] = useState(false)
  let totalItems = 0
>>>>>>> aa60d101d3098126b849da4bb89b744e018e63a0
  let display = [];
  let check = false;
  useEffect(() => {
    async function getBasket() {
      const response = await fetch(
        `http://localhost:9000/giftstore/basket?userName=${user.userName}`
      );
      const { data } = await response.json();
      setBasketData(data);
    }
    getBasket();
  }, [basket]);

  useEffect(() => {
    if (inputSearch !== "") {
      async function search() {
        const response = await fetch(
          `http://localhost:9000/giftstore/search?value=${inputSearch}`
        );
        const { data } = await response.json();
        setSearchedData(data);
      }
      search();
    } else {
      setSearchedData([]);
    }
  }, [inputSearch]);

  if (basketData.length !== 0) {
    basketData.forEach((element) => {
      totalItems = totalItems + element.quantity;
    });
  }
<<<<<<< HEAD
  function random(a) {
    return Math.floor(Math.random() * a);
  }
  if (searchedData !== undefined) {
    //Randomly displaying first 8 eight elements
    const mapSearchData = Object.keys(searchedData)
      .sort(() => random(searchedData.length))
      .slice(0, searchedData.length > 8 ? 8 : searchedData.length)
      .map((items) => (
        <SearchDrop
          image={searchedData[items].photo}
          name={searchedData[items].name}
          modelNo={searchedData[items].modelNo}
        />
      ));
    display =
      searchedData.length === 0 && inputSearch !== "" ? (
        <div style={{ color: "white" }}>No result Found</div>
      ) : (
        <ol className="search__display">{mapSearchData}</ol>
      );
=======

  if (searchedData !== undefined) {
    //Randomly displaying first 8 eight elements
    const mapSearchData = Object.keys(searchedData).slice(0, (searchedData.length > 8 ? 8 : searchedData.length)).map(items => <SearchDrop key={uuidv4()} image={searchedData[items].photo} name={searchedData[items].name} modelNo={searchedData[items].modelNo} />)
    display = searchedData.length !== 0 ? <ol className="search__display">{mapSearchData}</ol> : <div style={{ color: 'white' }}>No result Found</div>
>>>>>>> aa60d101d3098126b849da4bb89b744e018e63a0
  }
  if (display.length !== 0) {
    check = true;
  }
  const handleBlur = () => {
    if (!searchDropFocus) { setFocus(false) }
  }
  const handleFocus = () => {
    setFocus(true)
  }
  return (
    <div className="giftheader">
      <nav className="headergift">
        {/* Logo BBB-> Image */}
        <Link to="/giftstore">
          <img
            className="header__logogift"
            // src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
            src={logo}
            alt="store logo"
          />
        </Link>
        {/* Searchbox */}
        <div className="header__searchgift">
<<<<<<< HEAD
          <input
            onChange={(e) => setInputSearch(e.target.value)}
            type="text"
            value={inputSearch}
            className="header__searchInputgift"
          />
          <Link to={`/giftstore/products/search?query=${inputSearch}`}>
            <SearchIcon className="header__searchIcongift" />
          </Link>
=======
          <input onChange={e => setInputSearch(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} type="text" value={inputSearch} className="header__searchInputgift" />
          <Link to={`/giftstore/products/search?query=${inputSearch}`}><SearchIcon className="header__searchIcongift" /></Link>
>>>>>>> aa60d101d3098126b849da4bb89b744e018e63a0
        </div>
        {/* 3-Links */}
        <div className="header__navgift">
          <div className="header__optiongift header__linkgift">
            <span className="header__optionLineOnegift">100</span>
            <span className="header__optionLineTwogift">Store Points</span>
          </div>
          <Link to="/history" className="header__linkgift">
            <div className="header__optiongift">
              <span className="header__optionLineTwogift">History</span>
            </div>
          </Link>

          <Link to="/addPoints" className="header__linkgift">
            <div className="header__optiongift">
              <span className="header__optionLineTwogift">Add Credits</span>
            </div>
          </Link>

          {/* Basket Icon/ Items inside basket */}
          <Link to="/checkout" className="header__linkgift">
            <div className="header__optionBasketgift">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwogift header__basketCountgift">
                {totalItems}
              </span>
            </div>
          </Link>
        </div>
      </nav>
      {focus && <div className="searchDrop" onMouseEnter={() => setSearchdropfocus(true)} onMouseLeave={() => setSearchdropfocus(false)} >
        {display}
<<<<<<< HEAD
        {check && (
          <Link
            className="seemore"
            to={`/giftstore/products/search?query=${inputSearch}`}
          >
            See More...
          </Link>
        )}
      </div>
=======
        {check && <Link className="seemore" to={`/giftstore/products/search?query=${inputSearch}`}>See More...</Link>}
      </div>}
>>>>>>> aa60d101d3098126b849da4bb89b744e018e63a0
    </div>
  );
}

export default Header;
