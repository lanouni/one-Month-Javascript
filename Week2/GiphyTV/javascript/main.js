var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
var gif = new XMLHttpRequest();
gif.open("get",url);
gif.send()

gif.addEventListener("load",function(e){
    var data = e.target.response;
    show(data)
});

function show(data){
    var input = JSON.parse(data);
    var a = input.data;
    var container = document.querySelector(".container");
    for (let i = 0; i < a.length; i++) {
        setTimeout(() => {
            container.innerHTML = "";
            container.innerHTML += "<img src=\"" + a[i].images.fixed_height.url+ "\" class=\"container-image\">"
        }, 2000*i);
        
    }
}