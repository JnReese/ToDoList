var httpRequest = new XMLHttpRequest();
httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      if (response.tasks) {
        // clone the default task and change it's properties to each of these tasks
        response.tasks.forEach((task) => {
          addNewItem(task.content);
        });
      }
    } else {
      httpRequest.statusText;
    }
  }
};
httpRequest.onerror = function () {
  httpRequest.statusText;
};
httpRequest.open(
  "GET",
  "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=1",
  true
);
httpRequest.send();
let userInput = document.getElementById("userInput");
let createTask = document.getElementsByClassName("createTask");
let plusButton = document.getElementById("plusIcon");
let checkbox = document.getElementsByClassName("actualCheckbox");
let removeButton = document.getElementById("removeButton");
let removeAllButton = document.getElementById("removeAllItems");
let itemsCount = document.getElementById("countOfItems");
let defaultTask = document.getElementById("defaultTask");
let taskContainer = document.getElementById("tasks-container");
let numberOfItems = 0;
newItemCounter = 0;
let newTask = "";
userInput.addEventListener("keyup", (event) => {
  userInputTask = event.target.value;
  newTask = userInputTask;
});
plusButton.addEventListener("click", (event) => {
  plusButtonClicked = event.target;
  if (userInput.value == "") {
    alert("add task");
  }
  if (userInput.value !== "") {
    addNewItem();
    numberOfItems += 1;
    updateItemCount();
  }
});
removeButton.addEventListener("click", function () {
  removeSelectedItems();
  updateItemCount();
});
removeAllButton.addEventListener("click", function () {
  removeAll();
  countOfItems.innerHTML = "item count:" + " " + 0;
  numberOfItems = 0;
});
document.querySelectorAll(".delete").forEach((item) => {
  item;
  item.addEventListener("click", function (event) {
    event.target;
  });
});
function addNewItem(content) {
  let newItem = defaultTask.cloneNode(true);
  newItem.classList.add("tasks");
  newItem.style.margin = "0px 0px 0px 0px";
  newItem.id = "item" + newItemCounter;
  newItemCounter += 1;
  newItem.innerHTML += content || newTask;
  newItem.querySelector(".delete").addEventListener("click", function (event) {
    newItem.remove();
    updateItemCount();
  });
  taskContainer.append(newItem);
  let resetInput = document.getElementById("userInput").innerHTML;
  resetInput = "";
  updateItemCount();
}
function updateItemCount() {
  for (i = 0; i < checkbox.length; i++) {
    numberOfElements = checkbox.length;
    countOfItems.innerHTML = "item count:" + " " + (numberOfElements - 1);
  }
}
updateItemCount();
function checkIfCircleIsClickedAgain() {
  for (i = 0; i < checkedCircle.length; i++) {
    let buttonsClicked = checkedCircle[i];
    buttonsClicked.addEventListener("click", function (event) {
      event.target.style.visibility = "hidden";
      event.target.previousSibling.previousSibling.style.display = "flex";
    });
  }
}
function removeAll() {
  const taskContainer = document.getElementById("tasks-container");
  taskContainer.innerHTML = "";
}
