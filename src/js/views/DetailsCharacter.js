import React, { useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import "../../styles/details.css"
import { useParams } from "react-router-dom";

export function DetailsCharacter() {
	const { store, actions } = useContext(Context);

	//***** Para que a la hora de recargar la pagina no se pierdan los datos */
	let { uid } = useParams();

	useEffect(() => {
		actions.getDetailsPeople(uid);
	}, []);
	console.log(store)
	console.log(store.detailsPeople)

	const splitDetailsFirstPart = (obj) => {
		let firstPart = Object.entries(obj)
			.slice(0, Object.entries(obj).length / 2)
			.map(property => {
				return (
					<li key={property[0]} className="col-12 text-warning  list-unstyled">
						{property[0]} : {property[1]}
					</li>
				);
			});

		return <ul className=" col-6">{firstPart}</ul>;
	};

	const splitDetailsSecondPart = obj => {
		let secondPart = Object.entries(obj)
			.slice(Object.entries(obj).length / 2, Object.entries(obj).length)
			.map(property => {
				return (
					<li key={property[0]} className="col-12 text-warning list-unstyled">
						{property[0]} : {property[1]}
					</li>
				);
			});

		return <ul className=" col-6">{secondPart}</ul>;
	};

	return (
		<div className="container text-white">
			{store.detailsPeople ? (
				<div className="myBox">
					<div className="row">
						<div className="col-4">
							<img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} id="imgCharacter" />
						</div>
						<div className="col-8">
							<h2>{store.detailsPeople.properties.name}</h2>

							<p>{store.detailsPeople.description}</p>
						</div>
					</div>

					<hr className="bg-white" />

					<div className="row d-flex justify-content-center justify-content-md-start no-gutters">
						{splitDetailsFirstPart(store.detailsPeople.properties)}

						{splitDetailsSecondPart(store.detailsPeople.properties)}
					</div>
				</div>
			) : (
				<div className="text-center text-warning mt-5">
					<i className="fas fa-spinner fa-pulse fa-6x" />
				</div>
			)}
		</div>
	);
}
