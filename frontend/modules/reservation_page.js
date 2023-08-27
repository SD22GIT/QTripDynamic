import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try
  {
  const resp = await fetch(config.backendEndpoint+'/reservations/');
  const json = await resp.json();
  return json;
  }
  // Place holder for functionality to work in the Stubs
  catch(error)
  {
    console.log(error);
  }

  return null;

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
 if(reservations.length==0)
 {
  document.getElementById("reservation-table-parent").style.display="none";
  document.getElementById("no-reservation-banner").style.display="block";
 }
 else
 {
  document.getElementById("reservation-table-parent").style.display="block";
  document.getElementById("no-reservation-banner").style.display="none";
  let table = document.getElementById("reservation-table");
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 
  for(let i=0;i<reservations.length;++i)
  {
     let row = document.createElement("tr");

     let id = document.createElement("th");
     id.setAttribute("scope","col");
     id.append(reservations[i].id);

     let bookingName = document.createElement("td");
     bookingName.setAttribute("scope","col");
     bookingName.append(reservations[i].name);

     let adventure = document.createElement("td");
     adventure.setAttribute("scope","col");
     adventure.append(reservations[i].adventureName);

     let persons = document.createElement("td");
     persons.setAttribute("scope","col");
     persons.append(reservations[i].person);

     let date = document.createElement("td");
     date.setAttribute("scope","col");
     let dateVal = new Date(reservations[i].date);
     let dateVal1 = dateVal.getDate();
     let dateVal2 = dateVal.getMonth()+1;
     let dateVal3 = dateVal.getFullYear();
     date.append(`${dateVal1}/${dateVal2}/${dateVal3}`);

     let price = document.createElement("td");
     price.setAttribute("scope","col");
     price.append(reservations[i].price);

     let time = document.createElement("td");
     time.setAttribute("scope","col");
     let timeVal = new Date(reservations[i].time);
     let val1=timeVal.toLocaleTimeString("en-In");
     let val2=timeVal.getDate();
     let val3=timeVal.getFullYear();
     let val4=month[timeVal.getMonth()];
     time.append(`${val2} ${val4} ${val3}, ${val1}`);

     let buttonEl = document.createElement("td");
     let button = document.createElement("div");
     button.classList.add("reservation-visit-button");
     button.setAttribute("id",reservations[i].id);
     let link = document.createElement("a");
     link.setAttribute("href",`/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}`);
     link.textContent="Visit Adventure";
     button.append(link);
     buttonEl.append(button);

     row.append(id);
     row.append(bookingName);
     row.append(adventure);
     row.append(persons);
     row.append(date);
     row.append(price);
     row.append(time);
     row.append(buttonEl);


     table.append(row);
  }
 }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
