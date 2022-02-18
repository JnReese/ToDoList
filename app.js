var httpRequest = new XMLHttpRequest();
httpRequest.onload = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) {
      var response = JSON.parse(httpRequest.responseText);
      document.getElementById("firstTask").innerHTML +=
        response.tasks[0].content;
      document.getElementById("secondTask").innerHTML +=
        response.tasks[1].content;
      document.getElementById("thirdTask").innerHTML +=
        response.tasks[2].content;
      taskButtonStateHandler();
      removeAll();
    } else {
      console.log(httpRequest.statusText);
    }
  }
};
httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
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
let unCheckedCircle = document.getElementsByClassName("unchecked");
let checkedCircle = document.getElementsByClassName("markedAsComplete");
let removeButton = document.getElementById("removeButton");
let removeAllButton = document.getElementById("removeAllItems");
let itemsCount = document.getElementById("countOfItems");
let defaultTask = document.getElementById("defaultTask");
let numberOfItems = 0;
newItemCounter = 0;
let newTask = "";
userInput.addEventListener("keyup", (event) => {
  userInputTask = event.target.value;
  newTask = userInputTask;
});

plusButton.addEventListener("click", (event) => {
  plusButtonClicked = event.target;
  addNewItem();
  numberOfItems += 1;
  updateItemCount();
});
function addNewItem() {
  let newItem = defaultTask.cloneNode(true);
  newItem.style.display = "flex";
  newItem.style.margin = "0px 0px 7px 0px";
  newItem.id = "item" + newItemCounter;
  newItemCounter += 1;
  newItem.innerHTML += newTask;
  defaultTask.insertAdjacentElement("afterend", newItem);
  let resetInput = document.getElementById("userInput").innerHTML;
  resetInput = "";
  taskButtonStateHandler();
  removeAll();
}
function updateItemCount() {
  for (i = 0; i < unCheckedCircle.length; i++) {
    numberOfElements = unCheckedCircle.length;
    countOfItems.innerHTML = "item count:" + " " + (numberOfElements - 1);
  }
  removeAllButton.addEventListener("click", function () {
    countOfItems.innerHTML = "item count:" + " " + 0;
    numberOfItems = 0;
  });
}
updateItemCount();
for (i = 0; i < unCheckedCircle.length; i++) {
  let buttonsNotClicked = unCheckedCircle[i];
  buttonsNotClicked.addEventListener("click", function (event) {
    event.target.style.display = "none";
    event.target.nextSibling.nextSibling.style.visibility = "visible";
    checkIfCircleIsClickedAgain();
    removeSelectedItems();
  });
}
function taskButtonStateHandler() {
  for (i = 0; i < unCheckedCircle.length; i++) {
    let buttonsNotClicked = unCheckedCircle[i];
    buttonsNotClicked.addEventListener("click", function (event) {
      event.target.style.display = "none";
      event.target.nextSibling.nextSibling.style.visibility = "visible";
      checkIfCircleIsClickedAgain();
      removeSelectedItems();
    });
  }
}
function checkIfCircleIsClickedAgain() {
  for (i = 0; i < checkedCircle.length; i++) {
    let buttonsClicked = checkedCircle[i];
    buttonsClicked.addEventListener("click", function (event) {
      event.target.style.visibility = "hidden";
      event.target.previousSibling.previousSibling.style.display = "flex";
    });
  }
}
function removeSelectedItems() {
  for (i = 0; i < checkedCircle.length; i++) {
    let deleteSelected = checkedCircle[i];
    if (deleteSelected.style.visibility == "visible") {
      removeButton.addEventListener("click", function () {
        deleteSelected.parentElement.remove();
        updateItemCount();
      });
    }
  }
}
function removeAll() {
  activetasks = document.getElementsByClassName("unchecked");
  for (i = 0; i < activetasks.length; i++) {
    let allTasks = activetasks[i];
    removeAllButton.addEventListener("click", function () {
      if (allTasks.parentElement.id !== "defaultTask")
        allTasks.parentElement.remove();
    });
  }
}
removeAll();
