/* 1. Grab the input value */
document.querySelector(".js-go").addEventListener("click",function(){
    var a = document.querySelector("input").value;
    api(a);
    a = "";
});

document.querySelector("input").addEventListener("keyup",function(e){
 
    var a = document.querySelector("input").value;
    if (e.which === 13) {
        api(a);
        a = "";
    }    
});

/* 2. do the data stuff with the API */
function api(input){
var url = "https://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC";
var gif = new XMLHttpRequest();
gif.open('get',url);
gif.send();

gif.addEventListener("load",function(e){
    var data = e.target.response;
    pushToDom(data);
})
}



                function pushToDom(a){
                    var input = JSON.parse(a);
                    var urls = input.data;
                    urls.forEach(function(i) {
                        var a = document.querySelector(".js-container");
                     a.innerHTML += "<img src=\"" + i.images.fixed_height.url+ "\" class=\"container-image\">";
                    });
                    
                }
    