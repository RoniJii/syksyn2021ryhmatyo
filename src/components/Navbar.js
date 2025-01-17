import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Logo from './logo.png';
import Cart from './Cart';

export default function Navbar({url, setCategory, cart}) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(url + 'products/getcategories.php')
      .then((response) => {
        const json = response.data;
        setCategories(json);
        setCategory(json[0]);
      }).catch (error => {
        if (error.response === undefined) {
          alert(error);
        } else {
          alert(error.response.data.error);
        }
      })
  },[url, setCategory])

  return (
    <nav className="navbar navbar-expand-md fixed-top">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" 
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li>
            <Link className="navbar-brand" to="/">
              <img className="nav-logo" alt="logo" src={Logo} style={{ maxHeight: '70px'}}></img>
            </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">ETUSIVU</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">TUOTTEET</Link>
              <ul className="dropdown-menu" aria-labelledby="dropdown01">
                {categories.map(category => (
                  <li key={category.id}>
                    <Link className="dropdown-item"
                      to={{
                        pathname: '/Tuotteet',
                        state: {
                          id: category.id,
                          name: category.name,
                        }
                      }}
                    >
                    {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">OTA YHTEYTTÄ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/signup"><i className="far fa-user"></i></Link>
            </li>
            <li className="nav-item" style={{paddingTop : "16px", textDecoration : null}}>
              <Cart cart={cart}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
