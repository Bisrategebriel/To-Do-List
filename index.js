// select the elements
const clear = document.querySelector(".clear");
const theDate = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");

// class names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "line-through";

// Show Today's Date
const option = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
theDate.innerHTML = today.toLocaleDateString("en-US", option);

// add to-do
const addToDo = (toDo, id, done, trash) => {
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
};

// add item when enter key is pressed
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    const toDo = input.value;
    // if the input is not empty
    if (toDo) {
      addToDo(toDo);
    }
    input.value = "";
  }
});
