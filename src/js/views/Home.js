import React, { useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/home.css"

import { Characters } from "../component/Characters";
import { Planets } from "../component/Planets";


export const Home = () => {
	const { store } = useContext(Context);

	return (
		<div>
			{store.dataPeople.length > 0 &&
			store.dataPlanets.length > 0 ? (
				<>
					<div className="container">
						<h3 className="text-white text-left mb-4">Characters</h3>
						<div className="d-flex flex-row myScroll">
							<Characters />
						</div>
					</div>

					<div className="container">
						<h3 className="text-white text-left mb-4">Planets</h3>
						<div className="d-flex flex-row myScroll">
							<Planets />
						</div>
					</div>
				</>
			) : (
				<div className="text-center text-warning mt-5">
					<i className="fas fa-spinner fa-pulse fa-6x" />
				</div>
			)}
		</div>
	);
};
