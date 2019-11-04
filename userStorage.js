var TODOstorage = (function(){
   // var userList = [];

   

    // To access this list from the console you type " EditUsers.userList "
    let userList = [];

    // Add a new User to the listUser
    function addUser(id, name, email) {

        //Object user
        const user = {
            id: id,
            email: email,
            name: name,
            todoList: [],
        };

        user.id = id;
        user.name = name;
        user.email = email;
        userList.push(user);

    }

    // delete user from the listUser / Just enter his name (input)
    function removeUser(input) {

        for (let user in userList) {
            if (userList[user].name === input) {
                userList.splice(user, 1);
            }
        }
    }

    // Show the total users in the list.
    function showUser() {

        userList.forEach(name => console.log(name));
    }

//----------------------------- ls ----------------------------------------
    function init(){
        const lsUser = localStorage.getItem("usersInLocalStorage");
        EditUsers.userList = JSON.parse(lsUser);

        if(userList === null) {
            userList = [];
        }

    // console.log("Text");
    }

    function saveUser (done, description){
        //Get max ID i todos
        let maxId = 0;
        for (const i in EditUsers.userList){
            const user = EditUsers.userList[i];
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