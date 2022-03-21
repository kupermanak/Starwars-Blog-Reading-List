import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../img/sw-white.png";
import "../../styles/MyNavbar.css"

import { Context } from "../store/appContext";

export const MyNavbar = () => {
    const { store, actions } = useContext(Context);
    const [toggle, setToggle] = useState(false)

    let toggleOpen = () => setToggle(!toggle)
    const menuClass = `dropdown-menu${(toggle ? " show" : "")}`
    let urlArr;
    let category;
    let element;

    return (
        <div className="navLine">
            <nav className="navbar navbar-light bg-light cole" id="myNav">
                <Link to="/">
                    <img id="logo" src={logo} />
                </Link>

                <div className="dropdown myDropdown" onClick={()=>toggleOpen()}>
                    <button
                        className="btn btn-outline-warning dropdown-toggle pl-5 pr-5 bg-white"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        Favourites
                    </button>
                    <div className={menuClass} aria-labelledby="dropdownMenuButton">
                        <ul className="text-warning bg-dark">
                            {store.favourites && store.favourites.length > 0 ? (
                                store.favourites.map(item => {

                                    urlArr = item.url.split("/");

                                    category = urlArr[urlArr.length - 2];

                                    element = urlArr[urlArr.length - 1];

                                    return (
                                        <li
                                            key={item.url}
                                            className="dropdown-item text-warning d-flex justify-content-between align-items-center"
                                            id="myLiList">
                                            <Link to={`/${category}/${element}`}>{item.name}</Link>

                                            <i
                                                className="far fa-trash-alt"
                                                onClick={() => actions.deleteFavourite(item.url, store.favourites)}
                                            />
                                        </li>
                                    );
                                })
                            ) : (
                                <p className="pl-3">You do not have any favourite</p>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
