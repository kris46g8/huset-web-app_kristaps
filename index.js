window.addEventListener("DOMContentLoaded", getData);


function getData(){
    console.log("getData")
    fetch("https://janstevica.dk/KEA/2SEM/database/wp-json/wp/v2/event")
    .then(res=>res.json())
    .then(handleData)
}
function handleData(myData){
    console.log("myData")
    // 1 loop
    myData.forEach(showEvent)
}
function showEvent(event){


    //2. cloning a template
    const imgPath = event.image.guid;

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3. textcontent & innerHTML
    const title = eventCopy.querySelector("h1");
    title.textContent=event.title.rendered;

    const img = eventCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event " +event.title.rendered)

    const a = eventCopy.querySelector("a");
    a.href="sub.html?id="+event.id

     const p = eventCopy.querySelector("p");
    p.textContent = event.short_description;


    /*const content = postCopy.querySelector("section");
    content.innerHTML=post.content.rendered;

    const publisher = postCopy.querySelector(".publisher");
    publisher.innerHTML=post.publisher;*/

    //4. append
    document.querySelector("#posts").appendChild(eventCopy)
}
