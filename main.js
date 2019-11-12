window.addEventListener("DOMContentLoaded", init);


function init() {
    getFrontpageData();

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //console.log("this is search result")
        getSearchData();
    } else if (id) {
        getSingleEvent();
    } else if (category) {
        //category stuff

        getCategoryData(category)
    } else {
        //console.log("not searching")
        getFrontpageData();
    }

    getNavigation()

}

function getNavigation() {
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    //console.log(oneItem.name)
    //document.querySelector("nav").innerHTML += oneItem.name
    if (oneItem.parent === 15 && oneItem.count > 0) {
        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" + oneItem.id);
        document.querySelector("nav").appendChild(link);
    }
}

function getFrontpageData() {
    //console.log("getData")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catid) {
    console.log("catid")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&categories=20" + catid)
        .then(res => res.json())
        .then(handleData)
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&search=" + search)
        .then(res => res.json())
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

function handleData(myData) {
    // 1 loop
    myData.forEach(showEvent)
}

function showEvent(event) {


    //2. cloning a template
    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3. textcontent & innerHTML
    const eventTitle = eventCopy.querySelector("h1.eventTitle");
    eventTitle.textContent = event.title.rendered;

    const img = eventCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event " + event.title.rendered)

    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id;

    const shortDescription = eventCopy.querySelector("p.shortDescription");
    shortDescription.textContent = event.short_description;

    const eventDate = eventCopy.querySelector("h2.eventDate");
    eventDate.textContent = event.event_date;

    const eventTime = eventCopy.querySelector("h2.eventTime");
    eventTime.textContent = event.event_time;

    const eventPrice = eventCopy.querySelector(".eventPrice");
    eventPrice.textContent = event.event_price;


    /*const content = postCopy.querySelector("section");
    content.innerHTML=post.content.rendered;

    const publisher = postCopy.querySelector(".publisher");
    publisher.innerHTML=post.publisher;*/

    //4. append
    document.querySelector("#posts").appendChild(eventCopy)
}
