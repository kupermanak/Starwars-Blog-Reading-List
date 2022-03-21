import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/card.css"

import StarWars from "../../img/StarWars.png";


export function Card(props) {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			if (store.favourites && store.favourites.length > 0) {
				localStorage.setItem("store.favourites", JSON.stringify(store.favourites));
			}
		},
		[store.favourites]
	);
	console.log(props.category)
	let category = props.category === "/people/" ? "characters" : "planets"

	return (
		<div className="card myCard mr-2">
			<img className="card-img-top" src={`https://starwars-visualguide.com/assets/img/${category}/${props.id}.jpg`} onError={({ currentTarget }) => {
				currentTarget.onerror = null; // prevents looping
				currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
			}} alt={props.name} />

			<div className="card-body">
				<h5 className="card-title text-center">{props.name}</h5>

				<div className="d-flex justify-content-around">
					<Link to={`${props.category}${props.id}`}>
						<button className="btn btn-outline-primary" onClick={() => props.showDetails(props.id)}>
							Show more
						</button>
					</Link>

					<button
						className="btn icon"
						onClick={() => props.addFavourite(props.data, props.url, props.favouritesArr)}>
						{props.favorite === false ? (
							<i className="fas fa-heart fa-lg" />
						) : (
							<i className="fas fa-heart fa-lg text-danger" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	url: PropTypes.string,
	favorite: PropTypes.bool,
	addFavourite: PropTypes.func,
	showDetails: PropTypes.func,
	category: PropTypes.string,
	data: PropTypes.array,
	favouritesArr: PropTypes.array
};
