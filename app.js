//Select the elements

const clear = document.querySelector(".clear");

const dateElement = document.getElementById("date");

const list = document.getElementById("list");

const input = document.getElementById("input");

//Class Names

const CHECK = "fa-check-circle";

const UNCHECK = "fa-circle";

const LINE_THROUGH = "lineThrough";

//Variables

let LIST,id ;

//get items from the local storage

let data = localStorage.getItem("TODO");

//Check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST=[];
    id = 0;
}

//load items to the user's interface

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done,item.trash);

    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


//Show today's date

const options = {weekday : "long", month:"short", day:"numeric"};

const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add a new list on the To Do content

function addToDo(toDo, id, done,trash){
    if (trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item =  `<li class="item">
      <i class="far ${DONE} co" job="complete" id="${id}"></i>
      <p class ="text ${LINE}">${toDo}</p>
      <i class="fas fa-trash de" job = "delete" id="${id}"></i>
     </li>`;

     const position = "beforeend";

     list.insertAdjacentHTML(position, item);
}

//Add a new list on the To Do content by pressing *Enter*

document.addEventListener("keyup", function(event){
       if (event.keyCode == 13 ){
          const toDo = input.value;
            if(toDo){
                addToDo(toDo, id, false, false);

                LIST.push({
                    name : toDo,
                    id: id,
                    done: false,
                    trash:false
                });
                ///add item to local storage(this code must be added on update list array )

                localStorage.setItem("TODO", JSON.stringify(LIST));

                id++;

            }
            input.value="";
       }
});







//complete to-do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false:true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// event listener target the items created


list.addEventListener("click",function(event){
   const element = event.target;
   const elementJob = element.attributes.job.value;

   if(elementJob == "complete"){
       completeToDo(element);

   }else if(elementJob == "delete"){
       removeToDo(element);
   }
   ///add item to local storage(this code must be added on update list array )

    localStorage.setItem("TODO", JSON.stringify(LIST));
});


/// To do song on click

var button = document.getElementById('song');

var myAudio = document.getElementById('myAudio');

var isPlaying = false;

button.addEventListener('click', togglePlay);

function togglePlay(){


    if (isPlaying){
      button.style.color ="white";
      document.querySelector(".container").style.background="linear-gradient( 109.6deg,  rgba(69,179,224,1) 11.2%, rgba(102,51,153,1) 100.2% )";
      document.querySelector(".content").style.background="radial-gradient( circle farthest-corner at 10% 20%,  rgba(215,223,252,1) 0%, rgba(255,255,255,1) 0%, rgba(215,223,252,1) 84% )";
      document.querySelector(".add-to-do").style.background="radial-gradient( circle farthest-corner at 10% 20%,  rgba(215,223,252,1) 0%, rgba(255,255,255,1) 0%, rgba(215,223,252,1) 84% )";
      document.querySelector(".header").style.background="url(https://images.pexels.com/photos/1434608/pexels-photo-1434608.jpeg?auto=compress&cs=tinysrgb&h=650&w=940)";
      document.querySelector(".header").style.backgroundSize="100%";
      document.getElementById("date").style.visibility="visible";
      myAudio.pause();
    }else{
      button.style.color ="pink";
      document.querySelector(".container").style.background="radial-gradient( circle farthest-corner at -1.7% -2.7%,  rgba(250,138,138,1) 0%, rgba(198,124,204,1) 90% )";
      document.querySelector(".content").style.background="linear-gradient( 180.9deg,  rgba(248,229,249,1) -21.5%, rgba(209,170,223,1) 101.2% )";
      document.querySelector(".add-to-do").style.background="linear-gradient( 180.9deg,  rgba(248,229,249,1) -21.5%, rgba(209,170,223,1) 101.2% )";
      document.querySelector(".add-to-do").style.color ="pink";
      document.querySelector(".header").style.background="url(https://cdn.dribbble.com/users/2564483/screenshots/6312767/pinkpanther.gif)";
      document.querySelector(".header").style.backgroundSize="100%";
      document.getElementById("date").style.visibility="hidden";
      myAudio.play()
    }
};
myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};
