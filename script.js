// Primer paso: Selecciona los elementos principales del DOM:
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Crear la función para agregar una tarea
function createTaskElement(taskText) {
    //crear li y asignarlo a una clase
    const li = document.createElement("li");
    li.classList.add("task-item");
    //agregar el texto a la tarea
    li.textContent = taskText;
//crear el boton delete y asignarle clase
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");

    //Agregar el evento para eliminar una tarea
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    // Agregar el botón al li
    li.appendChild(deleteBtn);

    // Agregar el li a la lista principal
    taskList.appendChild(li);

    // Guardar el estado actualizado
    saveTasks();
}

// Agregar evento al botón de "Agregar"
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText);
        taskInput.value = ""; // limpiar el campo
    }
});

// Crear la función para guardar tareas en localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(item => {
        // Eliminar el texto "Eliminar" del botón
        const text = item.firstChild.textContent;
        tasks.push(text);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Crear la función para cargar las tareas desde localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => createTaskElement(task));
    }
}

// Llamar a loadTasks al iniciar la página
loadTasks();
