var TODOstorage = (function(){
   // var userList = [];

    function init(){
        const lsTodos = localStorage.getItem("usersInLocalStorage");
        EditUsers.userList = JSON.parse(lsTodos);

        if(userList === null) {
            userList = [];
        }

    // console.log("Text");
    }

    function saveUser (done, description){
        //Get max ID i todos
        let maxId = 0;
        for (const i in userList){
            const todo = userList[i];
            if (todo.id > maxId){
                maxId = todo.id;
            }
        }
        // Create TODO object
        const todo = {
            id: maxId + 1,
            done: done,
            description: description
        }

        userList.push(todo);

        saveChanges();
    }

    function listTodos(){
        return userList;
    }
    function getTodoById (id){

        for(const i in userList){
            const todo = userList [i];

            if(todo.id === id){
                return todo;
            }
        }
        return null;
    }

    function updateTodo(id,done,description){
       for(const i in userList){

        // update if id is found 
            if (userList[i].id === id){
                userList[i].done === done;
                userList[i].description === description;
            }
        }
        saveChanges();
    }
    function deletetodoById(){
        for (const i in userList){
            const todo = userList[i];

            if (todo.id === id){
                userList.splice (i, 1);
                break;
            }
        }
        saveChanges();
    }

    function saveChanges(){
        const lstodos = JSON.stringify(userList);
        localStorage.setItem ("usersInLocalStorage", lstodos);
    }

    return {init, saveTodo: saveUser, listTodos, getTodoById, updateTodo, deletetodoById}

})();
//Create TODO
//Read TODO by id
//List TODOs
//Update TODO
//Delete TODO

document.addEventListener ("DOMContentLoaded", function(){
    TODOstorage.init();
})

// localStorage.setItem("name", "Obaseki Nosa");