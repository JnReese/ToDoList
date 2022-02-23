document.addEventListener("DOMContentLoaded", function () {
  const createNewTaskPUT = async (inputValue) => {
    const response = await fetch(
      "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=288",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          task: {
            content: inputValue,
          },
        }),
      }
    );
    return response.json();
  };
  const recieveTaskFromServer = async () => {
    const response = await fetch(
      "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=288",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    return response.json();
  };
  const checkboxMarkState = async (id, action) => {
    const response = await fetch(
      `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/${action}?api_key=288`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );
    return response.json();
  };
  const deleteTaskRequest = async (id) => {
    const response = await fetch(
      `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=288`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    return response.json();
  };

  document.querySelector("#new-task-button").addEventListener("click", () => {
    const inputValue = document.querySelector("#new-task-input").value;
    if (inputValue) {
      createNewTaskPUT(inputValue).then((res) => createTaskElement(res.task));
    }
  });

  //effects the DOM

  const createTaskElement = (task) => {
    var template = document.querySelector("#task-template");
    var taskTemplateClone = template.content.cloneNode(true);

    taskTemplateClone.querySelector(".taskContent").innerHTML = task.content;
    taskTemplateClone.querySelector(".task").setAttribute("data-id", task.id);

    taskTemplateClone
      .querySelector(".checkbox")
      .addEventListener("change", handleCheckboxChange);

    taskTemplateClone
      .querySelector(".removeTask")
      .addEventListener("click", deleteTask);

    if (task.completed) {
      taskTemplateClone.querySelector(".checkbox").checked = true;
    }

    document.querySelector("#taskContainer").append(taskTemplateClone);
  };

  //

  const deleteTask = (e) => {
    const taskId = e.target.parentElement.getAttribute("data-id");
    deleteTaskRequest(taskId).then((res) => {
      if (res.success) e.target.parentElement.remove();
    });
  };

  //

  const handleCheckboxChange = (e) => {
    const taskId = e.target.parentElement.getAttribute("data-id");
    if (e.target.checked) {
      checkboxMarkState(taskId, "mark_complete");
    } else {
      checkboxMarkState(taskId, "mark_active");
    }
  };

  // retrieving all tasks from server
  recieveTaskFromServer().then((res) => {
    if (res.tasks) {
      res.tasks.forEach((task) => {
        createTaskElement(task);
      });
    }
  });
});
