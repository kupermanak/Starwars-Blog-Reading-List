import React, { useContext, useEffect } from "react";

import { Context } from "../store/appContext";

import "../../styles/details.css"
import planet from "../../img/planet.png";
import { useParams } from "react-router-dom";

export function DetailsPlanet() {
	const { store, actions } = useContext(Context);

	//***** Para que a la hora de recargar la pagina no se pierdan los datos */
	let { uid } = useParams();

	useEffect(() => {
		actions.getDetailsPlanet(uid);
	}, []);

	const splitDetailsFirstPart = obj => {
		let firstPart = Object.entries(obj)
			.slice(0, Object.entries(obj).length / 2)
			.map(property => {
				return (
					<li key={property[0]} className="col-12 text-warning list-unstyled">
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
			{store.detailsPanet ? (
				<div className="myBox">
					<div className="row">
						<div className="col-4">
							<img src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}} id="imgCharacter" />
						</div>
						<div className="col-8">
							<h2>{store.detailsPanet.properties.name}</h2>

							<p>{store.detailsPanet.description}</p>
						</div>
					</div>

					<hr className="bg-white" />
					<div className="row d-flex justify-content-center justify-content-md-start no-gutters">
						{splitDetailsFirstPart(store.detailsPanet.properties)}

						{splitDetailsSecondPart(store.detailsPanet.properties)}
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
