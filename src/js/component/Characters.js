import React, { useContext } from "react";

import { Card } from "./Card";
import { Context } from "../store/appContext";

export function Characters() {
	const { store, actions } = useContext(Context);

	return (
		<>
			{store.dataPeople.map(character => {
				return (
					<div key={character.uid} className="col-md-3">
						<Card
							id={character.uid}
							name={character.name}
							url={character.url}
							favorite={character.favorite}
							//Para ir al perfil del elemento seleccionado
							showDetails={actions.getDetailsPeople}
							category="/people/"
							//Para añadir a favoritos
							addFavourite={actions.addFavourite}
							data={store.dataPeople}
							favouritesArr={store.favourites}
						/>
					</div>
				);
			})}
		</>
	);
}