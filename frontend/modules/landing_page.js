import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try
  {
  const response = await fetch(config.backendEndpoint+"/cities");
  const data = await response.json();
  return data;
  }
  catch(error)
  {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.querySelector("#data");
  const responsiveDiv = document.createElement("div");
  responsiveDiv.className="col-12 col-sm-6 col-lg-3 mt-2";
  const cardDiv = document.createElement("div");
  cardDiv.className="card tile";
  responsiveDiv.append(cardDiv);
  const link = document.createElement("a");
  link.setAttribute("href",`pages/adventures/?city=${id}`);
  link.setAttribute("id",id);
  link.style.width="100%";
  link.style.height="100%";
  const img = document.createElement("img");
  img.setAttribute("src",image);
  img.setAttribute("alt","image");
  link.append(img);
  const textDiv = document.createElement("div");
  textDiv.className="d-flex flex-column tile-text";
  const text1 = document.createElement("div");
  text1.style.textAlign="center";
  text1.textContent=city;
  const text2 = document.createElement("div");
  text2.style.textAlign="center";
  text2.textContent=description;
  textDiv.append(text1);
  textDiv.append(text2);
  cardDiv.append(link);
  cardDiv.append(textDiv);
  container.append(responsiveDiv);
}

export { init, fetchCities, addCityToDOM };
