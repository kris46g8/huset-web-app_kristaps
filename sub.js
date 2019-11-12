const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)

fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event/" + id)
    .then(res => res.json())
    .then(showEvent)

function showEvent(event) {
    console.log(event)

    const imgPath = event.image.guid;

    const img = document.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event " + event.title.rendered)

 document.querySelector("h1.eventTitle").textContent = event.title.rendered;

document.querySelector("h2.eventDate").textContent = event.event_date;

document.querySelector("h2.eventTime").textContent = event.event_time;

document.querySelector(".eventPrice").textContent = event.event_price;

document.querySelector("p.longDescription").textContent = event.long_description;


}


/*const shortDescription = eventCopy.querySelector("p.shortDescription");
    shortDescription.textContent = event.short_description;

    const eventDate = eventCopy.querySelector("h2.eventDate");
    eventDate.textContent = event.event_date;

    const eventTime = eventCopy.querySelector("h2.eventTime");
    eventTime.textContent = event.event_time;

    const eventPrice = eventCopy.querySelector(".eventPrice");
    eventPrice.textContent = event.event_price;*/
