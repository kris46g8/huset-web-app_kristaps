window.addEventListener("DOMContentLoaded", getData);


function getData(){
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event?_embed&search="+search)
    .then(res=>res.json())
    .then(handleData)

    /*const id = urlParams.get("id");
    const category = urlParams.get("category");

    if(search){//if search has a value
        getSearchData();
    } else if(id){ //if id has a value
        getSingleEvent();
    } else if (category){
        //category stuff

        getCategoryData(category)
    } else { //if neither is true, get data from the frontpage
        getFrontpageData();
    }
    getNavigation()*/
}

function getNavigation(){
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/categories?per_page=100")
    .then(res=>res.json())
    .then(data=>{
        data.forEach(addLink)
    })
}

/*function addLink(oneItem){
    if(oneItem.parent === 14 && oneItem.count > 0){
        cost link = document.createElement("a");
        link.textContent=oneItem.name;
        link.setAttribute("href", "category.html?category="+oneItem.id)
        document.querySelector("nav").appendChild(link);
    }
}*/

function handleData(myData){
    console.log("myData")
    // 1 loop
    myData.forEach(showEvent)
}
function showEvent(event){
    console.log(event)

    /*const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;*/

    //2. cloning a template
    const imgPath = event.image.guid;
    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3. textcontent & innerHTML
    const h1 = eventCopy.querySelector("h1");
    h1.textContent=event.title.rendered;

    const img = eventCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event poster " + event.title.rendered)

    const a = eventCopy.querySelector("a");
    a.href="sub.html?id="+event.id

    /*const content = postCopy.querySelector("section");
    content.innerHTML=post.content.rendered;

    const publisher = postCopy.querySelector(".publisher");
    publisher.innerHTML=post.publisher;*/

    //4. append
    document.querySelector("#posts").appendChild(eventCopy)
}
