import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let values = search.split("=");
  // Place holder for functionality to work in the Stubs
  return values[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    try
    {
      const response =await fetch(config.backendEndpoint+ `/adventures/detail?adventure=${adventureId}`);
      const json = await response.json();
      return json;
    }
    catch(error)
    {
      console.log(error);
      return null;
    }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const adventureName = document.getElementById("adventure-name");
  const adventureSubtitle = document.getElementById("adventure-subtitle");
  const gallery = document.getElementById("photo-gallery");
  const adventureDetail = document.getElementById("adventure-content");

  adventureName.textContent = adventure.name;
  adventureSubtitle.textContent = adventure.subtitle;

  let images = adventure.images;
  for(let i=0;i<images.length;++i)
  {
    let divEl = document.createElement("div");
     let image = document.createElement("img");
     image.src=images[i];
     image.className="activity-card-image"
     divEl.append(image);
     gallery.append(divEl);
  }

  adventureDetail.textContent = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const gallery = document.getElementById("photo-gallery");
  gallery.innerHTML='';

  const carouselInner = document.createElement("div");
  carouselInner.className="carousel-inner";

  let first=true;
  for(let i=0;i<images.length;++i)
  {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if(first)
    {
      carouselItem.classList.add("active");
      first=false;
    }
    let image = document.createElement("img");
    image.src=images[i];
    image.classList.add("activity-card-image");
    image.classList.add("d-block");
    image.classList.add("w-100");
    carouselItem.append(image);
    carouselInner.append(carouselItem);
  }

let html = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div><div class="carousel-inner">`;

html = html + carouselInner.innerHTML;

html = html + `</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`;


 gallery.innerHTML='';
 gallery.innerHTML=html;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const reservationPanel = document.getElementById("reservation-panel-available");
  let isAvailable = adventure.available;

  if(isAvailable)
  {
      soldOutPanel.style.display="none";
      reservationPanel.style.display="block";
      const costPerHead = document.getElementById("reservation-person-cost");
      costPerHead.textContent = adventure.costPerHead;
  }
  else
  {
      reservationPanel.style.display="none";
      soldOutPanel.style.display="block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const costPerHead = adventure.costPerHead;
  const total = persons*costPerHead;

  const reservationCost = document.getElementById("reservation-cost");

  reservationCost.textContent = total;
  //console.log(reservationCost.innerHTML);
}

//Implementation of reservation form submission
 function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  let data = {};
  const form = document.getElementById("myForm");
  form.addEventListener("submit",async (event)=>{
    event.preventDefault();
    const {name,date,person} = form.elements;
    data.name = name.value;
    data.person = person.value,
    data.date = date.value,
    data.adventure = adventure.id


    const resp = await fetch(config.backendEndpoint+`/reservations/new`,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {'Content-Type':'application/json'}
    });

    const json = await resp.json();
    if(json.success)
    {
       alert("Success!");
    }
    else
    {
      alert("Failed!");
    }
  });

  

 
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
   let reservation = adventure.reserved;

   if(reservation)
   {
    document.getElementById("reserved-banner").style.display="block";
   }
   else
   {
    document.getElementById("reserved-banner").style.display="none";
   }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
