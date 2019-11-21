window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //console.log("this is search result")
        console.log("search")
        getSearchData();
    } else if (id) {
        //console.log("id")

        getSingleEvent();
    } else if (category) {
        //category stuff

        getCategoryData(category)
    }
    else {
//        console.log("elseeee")
//
//        //console.log("not searching")
        getFrontpageData();
    }

    getNavigation()

}

function getNavigation(){
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //console.log(oneItem.name)

    if (oneItem.parent === 15 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" +oneItem.id)
        document.querySelector(".main-menu").appendChild(link);
    }
}

function getFrontpageData() {
    //console.log("getData")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catid) {

    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&categories=" + catid) //removed 20 after embed&categories
        .then(res => res.json())
        .then(handleData)
}

function getSearchData(){
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&search=" +search)
    .then(res=>res.json())
    .then(handleData)
}

function getSingleEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    //console.log(id)

    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event/" + id)
        .then(res => res.json())
        .then(showEvent)
}

function handleData(myData) {
    // 1 loop
    //console.log(myData)
    myData.forEach(showEvent)
}


function showEvent(event) {


    //2. cloning a template
    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3. textcontent & innerHTML
    const eventTitle = eventCopy.querySelector("h2");
    eventTitle.textContent = event.title.rendered;

    const img = eventCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event " + event.title.rendered)

    const shortDescription = eventCopy.querySelector("p.shortDescription");
    shortDescription.textContent = event.short_description;

    const eventDate = new Date(event.event_date + "T" + event.event_time);

    const hours =eventDate.getHours() < 10 ? "0" +eventDate.getHours() : "" +eventDate.getHours();

    const minutes = eventDate.getMinutes() < 10 ? "0" + eventDate.getMinutes() : "" +eventDate.getMinutes();

    const time = eventCopy.querySelector(".eventTime");
    time.textContent = `${hours}:${minutes}`;

    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    const year = "" + eventDate.getFullYear();
    const month = months[eventDate.getMonth()];
    const day = "" + eventDate.getDate();
    const date = eventCopy.querySelector(".eventDate");
    date.textContent = `${day}. ${month}  ${year}`;


//    const eventTime = eventCopy.querySelector("h2.eventTime");
//    eventTime.textContent = event.event_time;

    const eventPrice = eventCopy.querySelector(".eventPrice");
    eventPrice.textContent = event.event_price;

    const longDescription = eventCopy.querySelector("p.longDescription");
    longDescription.textContent = event.long_description;

    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    /*const content = postCopy.querySelector("section");
    content.innerHTML=post.content.rendered;

    const publisher = postCopy.querySelector(".publisher");
    publisher.innerHTML=post.publisher;*/

    //4. append
    document.querySelector("#posts").appendChild(eventCopy)
}

//BURGER MENU



















