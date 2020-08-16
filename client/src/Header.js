import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import logo from "./images/logo.png";

function Header(props) {
  const [{ basket }] = useStateValue();
  return (
    <nav className="headergift">
      {/* Logo BBB-> Image */}
      <Link to="/">
        <img
          className="header__logogift"
          // src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          src={logo}
          alt="store logo"
        />
      </Link>
      {/* Searchbox */}
      <div className="header__searchgift">
        <input type="text" className="header__searchInputgift" />
        <SearchIcon className="header__searchIcongift" />
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
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
