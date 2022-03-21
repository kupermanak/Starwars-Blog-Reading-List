import React, { useContext } from "react";

import { Card } from "./Card";
import { Context } from "../store/appContext";

export function Planets() {
	const { store, actions } = useContext(Context);

	return (
		<>
			{store.dataPlanets.map(planet => {
				return (
					<div key={planet.uid} className="col-md-3">
						<Card
							id={planet.uid}
							name={planet.name}
							url={planet.url}
							favorite={planet.favorite}
							//Para ir al perfil del elemento seleccionado
							showDetails={actions.getDetailsPlanet}
							category="/planets/"
							//Para añadir a favoritos
							addFavourite={actions.addFavourite}
							data={store.dataPlanets}
							favouritesArr={store.favourites}
						/>
					</div>
				);
			})}
		</>
	);
}
