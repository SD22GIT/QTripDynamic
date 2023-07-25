
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const x = search.indexOf("=");
  const y = search.length;
  return search.substring(x+1,y);

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const response =await fetch(config.backendEndpoint+ `/adventures?city=${city}`);
  const json = await response.json();
  return json;
  }
  catch(error)
  {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i=0;i<adventures.length;++i)
  {
    const container = document.querySelector("#data");

    const cardContainer = document.createElement("div");
    cardContainer.className="col-12 col-sm-6 col-lg-3 mt-2";
    const card = document.createElement("div");
    card.className="card";
    const link = document.createElement("a");
    link.setAttribute("href",`detail/?adventure=${adventures[i].id}`);
    link.setAttribute("id",adventures[i].id);
    const img = document.createElement("img");
    img.setAttribute("src",adventures[i].image);
    img.className="activity-card-image";
    
    const text = document.createElement("div");
    text.className="d-flex flex-column";
    const textContainer1 = document.createElement("div");
    textContainer1.className="d-flex justify-content-between pb-2 pt-1";
    const textContainer1_text1 = document.createElement("div");
    textContainer1_text1.style.paddingLeft="15px";
    textContainer1_text1.textContent=adventures[i].name;
    const textContainer1_text2 = document.createElement("div");
    textContainer1_text2.style.paddingRight="15px"
    textContainer1_text2.innerHTML='&#8377;'+adventures[i].costPerHead;
    textContainer1.append(textContainer1_text1);
    textContainer1.append(textContainer1_text2);

    const textContainer2 = document.createElement("div");
    textContainer2.className="d-flex justify-content-between pb-2";
    const textContainer2_text1 = document.createElement("div");
    textContainer2_text1.style.paddingLeft="15px";
    textContainer2_text1.textContent="Duration";
    const textContainer2_text2 = document.createElement("div");
    textContainer2_text2.style.paddingRight="15px"
    textContainer2_text2.textContent=adventures[i].duration+" HOURS";
    textContainer2.append(textContainer2_text1);
    textContainer2.append(textContainer2_text2);

    text.append(textContainer1);
    text.append(textContainer2);

    const banner = document.createElement("div");
    banner.className="category-banner";
    banner.textContent=adventures[i].category;
    
    link.append(img);
    card.append(banner);
    card.append(link);
    card.append(text);
    cardContainer.append(card);


    container.append(cardContainer);

  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
