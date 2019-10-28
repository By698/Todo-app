let todos = [];

let updateTodos = () => {
    let todosDiv = document.getElementById("todoListView");
    while(todosDiv.firstChild) {
        todosDiv.removeChild(todosDiv.firstChild);
    }

    let filter = document.getElementById("search").value;

    todos.forEach((todo, index) => {
        if ((filter == "") 
            || (todo.title.includes(filter)) 
            || (todo.description.includes(filter))) {

                let newTodoElement = document.createElement("tr");

                let newTitleElement = document.createElement("td");
                newTitleElement.appendChild(document.createTextNode(todo.title));

                let newDescriptionElement = document.createElement("td");
                newDescriptionElement.appendChild(document.createTextNode(todo.description));

                let newPlaceElement = document.createElement("td");
                newPlaceElement.appendChild(document.createTextNode(todo.place));

                let newDueDateElement = document.createElement("td");
                newDueDateElement.appendChild(document.createTextNode(todo.dueDate));

                let newTdElement = document.createElement("td");
                let newDeleteButton = document.createElement("button");
                newDeleteButton.appendChild(document.createTextNode("x"));

                newDeleteButton.type = "button";
                newDeleteButton.addEventListener("click", () => deleteTodo(index))
                newTdElement.appendChild(newDeleteButton);

                newTodoElement.appendChild(newTitleElement);
                newTodoElement.appendChild(newDescriptionElement);
                newTodoElement.appendChild(newPlaceElement);
                newTodoElement.appendChild(newDueDateElement);
                newTodoElement.appendChild(newTdElement);
                
                todosDiv.appendChild(newTodoElement);
        }
    });
 
}

// let initList = () => {
//     let savedTodos = window.localStorage.getItem("todos");
//         if (savedTodos != null)
//             todos = JSON.parse(savedTodos)
//         else {
//             todos.push(
//                 {
//                     title: "Learn JS",
//                     description: "Create a demo aplication for my TODO's",
//                     place: "445",
//                     dueDate: new Date(2019, 10, 15)
//                 },
//                 {
//                     title: "Lorem Ipsum",
//                     description: "lorem ipsum dolor sit amet",
//                     place: "Ipsum 123 Lorem",
//                     dueDate: new Date(2020, 1, 1)
//                 },
//                 {
//                     title: "Wyniesc smieci",
//                     description: "Wyniesc smieci po prostu",
//                     place: "dom",
//                     dueDate: new Date(2019, 11, 11)
//                 }
//             )
//         }
//     setTimeout(updateTodos);
// }

let addTodo = () => {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let place = document.getElementById("place").value;
    let dueDate = new Date(document.getElementById("dueDate").value);

    let todo = {
        title: title,
        description: description,
        place: place,
        dueDate: dueDate
    };
    todos.push(todo);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    updateJSONbin();
    updateTodos();
}

let deleteTodo = index => {
    todos.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(todos));
    updateJSONbin();
    updateTodos();
}

// initList();
$.ajax({
    url: 'https://api.jsonbin.io/b/5dad5d31930aca6ad74c00bc',
    type: 'GET',
    headers: {
        'secret-key': '$2b$10$DoSwH1ZuPGOrht4cJsCMeeCTHpu0H3R4SO6ECglnNYFLxug0qqfu6'
    },
    success: data => {
        todos = data;
        updateTodos();
    },
    error: err => {
        console.log(err.responseJSON);
    }
});

let updateJSONbin = () => {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5dad5d31930aca6ad74c00bc',
        type: 'PUT',
        headers: {
            'versioning': 'false',
            'secret-key': '$2b$10$DoSwH1ZuPGOrht4cJsCMeeCTHpu0H3R4SO6ECglnNYFLxug0qqfu6'
        },
        contentType: 'application/json',
        versioning: false,
        data: JSON.stringify(todos),
        success: data => {
            console.log(data);
        },
        error: err => {
            console.log(err.responseJSON);
        }
    })
};