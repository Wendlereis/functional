const toDoTitle = document.querySelector("#todoTitle");
const toDoDescription = document.querySelector("#todoDescription");
const toDoList = document.querySelector("#toDoList");

const compose = (...functions) => {
  return (value) => {
    [...functions].reduce(
      (composedValue, currentFunction) => currentFunction(composedValue),
      value
    );
  };
};

const todoStore = () => {
  let toDos = [];

  return (action) => {
    switch (action.type) {
      case "add":
        toDos = [...toDos, action.toDo];
        return toDos;

      default:
        return toDos;
    }
  };
};

const todoDispatch = todoStore();

const addTodoAction = (toDo) => ({ type: "add", toDo });

const addToDo = () => {
  const toDo = { title: toDoTitle.value, description: toDoDescription.value };

  const addTodoResult = compose(addTodoAction, todoDispatch, renderToDos);

  addTodoResult(toDo);
};

const renderToDos = (toDos) => {
  toDoList.innerHTML = null;

  toDos.forEach((toDo) => {
    const toDoTemplate = `
      <div class="card ml-4" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${toDo.title}</h5>
          <p class="card-text">${toDo.description}</p>
        </div>
      </div>
    `;

    toDoList.innerHTML += toDoTemplate;
  });
};
