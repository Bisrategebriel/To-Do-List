// select the elements
const clear = document.querySelector(".clear");
const theDate = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// class names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "line-through";

// variables
let List;
let id;

// get the items from local storage
let data = localStorage.getItem("ToDo");

// check if data is empty
if (data) {
  List = JSON.parse(data);
  id = List.length;
  loadList(List);
} else {
  List = [];
  id = 0;
}

// load the items to the user
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Show Today's Date
const option = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
theDate.innerHTML = today.toLocaleDateString("en-US", option);

// add to-do
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const doned = done ? check : uncheck;
  const lined = done ? lineThrough : "";

  const item = `<li class='item'>
                  <i class='fa ${doned} co' job='complete' id='${id}'></i>
                  <p class='text ${lined}'> ${toDo} </p>
                  <i class='fa fa-trash-o d-icon' job='delete' id=${id}></i>
                </li> <br>`;
  list.insertAdjacentHTML("beforeend", item);
}

// add item when enter key is pressed
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    const toDo = input.value;
    // if the input is not empty
    if (toDo) {
      addToDo(toDo);
      List.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add an item to a local storage
      localStorage.setItem("ToDo", JSON.stringify(List));

      id++;
    }
    input.value = "";
  }
});

// complete to-do
const completeToDo = (el) => {
  el.classList.toggle(check);
  el.classList.toggle(uncheck);
  el.parentNode.querySelector(".text").classList.toggle(lineThrough);

  List[el.id].done = List[el.id].done ? false : true;
};

// remove a todo
function removeToDo(el) {
  el.parentNode.parentNode.removeChild(el.parentNode);

  List[el.id].trash = true;
}

// target the elements dynamically
list.addEventListener("click", (el) => {
  const selement = el.target; //return clicked element
  const elementJob = selement.attributes.job.value;

  if (elementJob == "complete") {
    completeToDo(selement);
  } else if (elementJob == "delete") {
    removeToDo(selement);
    // add an item to a local storage
    localStorage.setItem("ToDo", JSON.stringify(List));
  }
});
