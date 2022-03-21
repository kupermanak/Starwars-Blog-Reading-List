const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			dataPeople: [],
			dataPlanets: [],
			favourites: []
			
		},
		actions: {
			getDataPeople: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/people");

					const data = await response.json();

					//Para poder meter el item como favorito

					let formattedCharacters = data.results.map(item => {
						return { ...item, favorite: false };
					});

					setStore({ dataPeople: formattedCharacters });
				} catch (e) {
					console.error(`error from database -- ${e}`);
				}
			},

			getDataPlanets: async () => {
				try {
					let response = await fetch("https://www.swapi.tech/api/planets");

					const data = await response.json();

					let formattedPlanets = data.results.map(item => {
						return { ...item, favorite: false };
					});

					setStore({ dataPlanets: formattedPlanets });
				} catch (e) {
					console.error(`error from database -- ${e}`);
				}
			},

			getDetailsPeople: async id => {
				try {
					let response = await fetch(`https://www.swapi.tech/api/people/${id}`);

					const data = await response.json();

					let data_DetailsPeople = data.result;

					//Da un objecto
					setStore({ detailsPeople: data_DetailsPeople });
				} catch (e) {
					console.error(`error from database -- ${e}`);
				}
			},

			getDetailsPlanet: async id => {
				try {
					let response = await fetch(`https://www.swapi.tech/api/planets/${id}`);

					const data = await response.json();

					let data_DetailsPlanet = data.result;

					//Da un objecto
					setStore({ detailsPanet: data_DetailsPlanet });
				} catch (e) {
					console.error(`error from database -- ${e}`);
				}
			},
			
			addFavourite: (dataArr, itemUrl, favouritesArr) => {
				dataArr.map(item => {
					if (favouritesArr && item.url === itemUrl) {
						if (favouritesArr.length === 0) {
							item.favorite = true;
							setStore({ favourites: [...favouritesArr, item] });
						} else {
							//NO REPETIR ELEMENTO EN FAVORITOS
							if (!favouritesArr.some(item => item.url === itemUrl)) {
								item.favorite = true;
								setStore({ favourites: [...favouritesArr, item] });
							}
						}
					}
				});
			},

			//Para poder recoger los datos guardados en el local storage al recargar la página
			getFavourites: () => {
				let initFavo = JSON.parse(localStorage.getItem("store.favourites"));
				// Al iniciar la página "favourites" está vacío, por lo que al no encontrarlo
				//lo transforma en null, para evitar eso es necesario este if
				if (initFavo) {
					setStore({ favourites: initFavo });
				}
			},

			deleteFavourite: (itemUrl, favouritesArr) => {
				favouritesArr.map((item, index) => {
					if (item.url === itemUrl) {
						item.favorite = false;
						favouritesArr.splice(index, 1);
						setStore({ favourites: [...favouritesArr] });
					}
				});
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
