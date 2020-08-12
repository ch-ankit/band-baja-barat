import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import logo from "./images/logo.png";

function Header(props) {
  const [{ basket }] = useStateValue();
  console.log(basket);
  return (
    <nav className="header">
      {/* Logo BBB-> Image */}
      <Link to="/">
        <img
          className="header__logo"
          // src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          src={logo}
          alt="store logo"
        />
      </Link>
      {/* Searchbox */}
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      {/* 3-Links */}
      <div className="header__nav">
        <div className="header__option header__link">
          <span className="header__optionLineOne">100</span>
          <span className="header__optionLineTwo">Store Points</span>
        </div>
        <Link to="/history" className="header__link">
          <div className="header__option">
            <span className="header__optionLineTwo">History</span>
          </div>
        </Link>

        <Link to="/addPoints" className="header__link">
          <div className="header__option">
            <span className="header__optionLineTwo">Add Credits</span>
          </div>
        </Link>

        {/* Basket Icon/ Items inside basket */}
        <Link to="/checkout" className="header__link">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket.length}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
