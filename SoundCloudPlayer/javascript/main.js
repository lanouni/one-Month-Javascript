// seach

var UI = {};
UI.enterPress = function(){
  var search = document.querySelector('input');
  search.addEventListener("keyup",function(c){
    if(c.which === 13){
      SoundCloud.gettrack(search.value);
    }
    console.log(c);
  });
};
UI.enterPress();

UI.submitClick = function(){
  var search = document.querySelector('.search');
  search.addEventListener("click",function(){
    var iput = document.querySelector('input');
      SoundCloud.gettrack(iput.value);
  })
};
UI.submitClick();




// sound cloud query

var SoundCloud ={};
SoundCloud.init = function(){
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}

SoundCloud.init();
  
  // find all sounds of buskers licensed under 'creative commons share alike'
SoundCloud.gettrack=function(val){
    SC.get('/tracks', {
    q: val
  }).then(function(tracks) {
    console.log(tracks);
    SoundCloud.renderTracks(tracks);
  });
}



SoundCloud.renderTracks=function(tracks){

  tracks.forEach(function(e) {
    console.log(e);
    //    Get all the div
  var allSearch = document.querySelector(".js-search-results");

  // create card and add it to the base div
  var card  = document.createElement("div");
  card.classList.add("card");
  allSearch.appendChild(card);

  // create image div and add it to 
  var divImage = document.createElement("div");
  divImage.classList.add("image");
  card.appendChild(divImage);

  // create image and add it to the div image 
  var img = document.createElement("img");
  img.classList.add("image_img");
  img.src=e.artwork_url;
  divImage.appendChild(img);

  //create the div content and add it to the card 
  var divContent = document.createElement("div");
  divContent.classList.add("content");
  card.appendChild(divContent);

  //create the header div and add it to the div content
  var divHeader = document.createElement("div");
  divHeader.classList.add("header");
  divContent.appendChild(divHeader);
  
  //add the link to the div header
  divHeader.innerHTML = '<a href="'+e.permalink_url+'" target="_blank">"'+e.title+'"</a>';

  // create div button add to play list
  var divbtn = document.createElement("div");
  divbtn.classList.add("ui", "bottom", "attached", "button", "js-button");
  divContent.appendChild(divbtn);

  // create icon
  var icon = document.createElement("i");
  icon.classList.add("add","icon");
  divbtn.append(icon);

  // create span
  var spanPlayList = document.createElement("span");
  spanPlayList.innerHTML="Add to playlist";
  divbtn.appendChild(spanPlayList);

  divbtn.addEventListener("click",function(){
    SoundCloud.getEmbed(e.permalink_url);
  })
  });
  
}

// add to playlist
SoundCloud.getEmbed = function(Url){
  SC.oEmbed(Url, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
  var sideBar = document.querySelector(".js-playlist");
  var box = document.createElement('div');
  box.innerHTML = embed.html;
  sideBar.insertBefore(box,sideBar.firstChild);
  localStorage.setItem("key",sideBar.innerHTML);
});
}
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");


// 5: add a reset button

UI.resetButton = function(){
  var main = document.querySelector(".col-right");
  var resetBtn = document.createElement('i');
  resetBtn.classList.add("ui", "bottom", "attached", "button", "js-button");
  resetBtn.textContent = "reset";
  resetBtn.type = "submit";
  main.insertBefore(resetBtn,main.firstChild);
  resetBtn.addEventListener("click",function(){
    localStorage.clear();
    sideBar.innerHTML = "";
  });
}
UI.resetButton();