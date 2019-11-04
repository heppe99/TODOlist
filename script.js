

var EventHandlers = (function () {


    var todoList = [];
    let currentId = null;
    let signedIn = false;

    function init() {
        $("#addToListBtn").click(onClickAddItemTodo);

        //Handles deletebutton on each todo
        $(document).on('click', '.deleteBtn', function () {

            ToDoListHandler.deleteItem(todoList, this.id);
            console.log("DELETE item: " + this.id);

            documentEdit.deleteLi(this.id * 100);
            console.log("DELETE li: " + this.id * 100);
            UserStorage.updateUser(currentId, todoList);

            refresh();
        })
        //Handles completebutton on each todo
        $(document).on('click', '.completeBtn', function () {
            console.log("COMPLETE BUTTON :" + this.id);
            ToDoListHandler.markAsComplete(todoList, this.id / 1000);
            UserStorage.updateUser(currentId, todoList);

            refresh();
        })

        //register event
        $("#registerBtn").click(function () {


            const name = $("#registerInputName").val();
            const email = $("#registerInputEmail").val();

            tempUser = UserStorage.getUserByEmail(email);
            if (tempUser != null) {
                console.log("Email already in use! test");
                return;
            }

            UserStorage.saveUser(name, email);


            const user = UserStorage.getUserByEmail(email);
            todoList = user.todoList;
            currentId = user.id;
            signedIn = true;

            console.log("You can start using your todo-list");
            documentEdit.infoText("You can start using your todo-list");
            documentEdit.setUserName(user.name);
            documentEdit.setUserEmail(user.email);
            $("#addTodos").show();
            refresh();

        });
        //sign up event
        $(".loginBtn").click(function () {
            $("#todoList").empty();
            const email = $("#loginInput").val();
            let user = UserStorage.getUserByEmail(email);

            if (user === null) {
                console.log("Sign up first");
            }
            else {
                $("#addTodos").show();
                documentEdit.hideRegister();


                todoList = user.todoList;
                refresh();
                documentEdit.setUserName(user.name);
                documentEdit.setUserEmail(user.email);
                documentEdit.setUserTodo(todoList.length)
                //We need to set some values at this point so the user can 
                // start adding items to his to do list
                signedIn = true;
                currentId = user.id;
                console.log("You can manage your todo's now");
                documentEdit.infoText("You can manage your todo's now");

            }
        })
        //Sign out event
        $("#logOutBtn").click(function () {
            $("#addTodos").hide();
            documentEdit.showRegister();
            $("#todoList").empty();
            currentId = -1;
            signedIn = false;
            documentEdit.setUserName(" ");
            documentEdit.setUserEmail(" ");
            console.log("You have logged out.");
            documentEdit.infoText("You have logged out.");

        })

        //click event that sorts list elements after prio
        $("#sort-button").click(function () {
            console.log("click works");
            ToDoListHandler.sortTodoList(todoList);
            UserStorage.updateUser(currentId, todoList);
            refresh();
        })
    }


    //Function that updates  
    function onClickAddItemTodo() {
        //checks first if user is signed in else alert 
        if (signedIn) {

            const inputItem = $("#inputItemToList").val();
            const prioItem = $("#inputPrioItem").val();

            //tar in en todolist av en user, 
            ToDoListHandler.addItem(todoList, inputItem, prioItem);

            refresh();

            //Important: we need to save the updated to do list with its user to local storage 
            UserStorage.updateUser(currentId, todoList);
        }
        else {
            console.log("Login first");
            documentEdit.infoText("Login first")
        }
    }

    //Refreshes the UL list
    function refresh() {
        $("#todoList").empty();
        documentEdit.setUserTodo(todoList.length)
        for (const i in todoList) {
            const todoItemInHtml = (todoList[i].activity + " | Prio: " + todoList[i].priority + " | Complete: " + todoList[i].completed)
            documentEdit.addLi(todoItemInHtml, i);
        }
    }



    return { init, refresh }

})();

// Here I grouped together Khaleds code in a user storage manager
var UserStorage = (function () {

    var userList = [];


    //Gets all the users from local Storage to userList
    function init() {
        const listUsers = localStorage.getItem("UserListLocalStorage");
        userList = JSON.parse(listUsers);

        if (userList === null) {
            userList = [];
        }
    }

    //Saves new user in LocalStorage
    function saveUser(name, email) {
        //Sets the max id 
        let maxId = 0;
        for (const i in userList) {
            const user = userList[i];
            if (user.id > maxId) {
                maxId = user.id;
            }
        }
        //check if email already in use...
        for (const i in userList) {
            const user = userList[i];
            if (user.email === email) {
                console.log("Email already in use!");
                return null;
            }
        }
        // Create User object, used max id for initializing id 
        const user = {
            id: maxId + 1,
            email: email,
            name: name,
            todoList: [],
        };


        userList.push(user);


        saveChangesUserList();
    }

    //Not in use...
    function getUserList() {
        return userList;
    }

    //Gets the user object from user email.
    function getUserByEmail(email) {

        for (const i in userList) {
            const user = userList[i];

            if (user.email === email) {
                return user;
            }

        }
        return null;
    }

    //removes user, haven't done anything with this, kinda copied Linus code friday
    function removeUser(id) {
        for (const i in userList) {
            const user = userList[i];
            if (user.id === id) {

                userList.splice(i, 1);
                break;
            }
        }
        saveChangesUserList();
    }

    // important function .. everytime we add or remove an item on the to do list
    // we need to update the user and its updated to do list in local storage
    function updateUser(id, updatedTodoList) {
        for (const i in userList) {
            //Update if id is found
            if (userList[i].id === id) {
                userList[i].todoList = updatedTodoList;
            }
        }

        saveChangesUserList();
    }

    //Saves to local storage
    function saveChangesUserList() {
        const listUsers = JSON.stringify(userList);
        localStorage.setItem('UserListLocalStorage', listUsers);
    }

    return {
        init,
        saveUser,
        getUserByEmail,
        getUserList,
        updateUser,
        removeUser,
        saveChangesUserList

    }

})();


var documentEdit = (function () {

    function showRegister() {
        $("#registerInputName").show();
        $("#registerInputEmail").show();
        $("#registerBtn").show();
    }
    function hideRegister() {
        $("#registerInputName").hide();
        $("#registerInputEmail").hide();
        $("#registerBtn").hide();
    }


    function addLi(text, index) {

        btn = "<button class=\"deleteBtn\" id=\"" + index + "\" >✘</button>"
        completeButton = "<button class=\"completeBtn\" id=\"" + (index * 1000) + "\" >✔</button>"
        $("#todoList").append("<li id=\"" + index * 100 + "\" >" + text + completeButton + btn + "</li>");


    }
    function deleteLi(index) {
        console.log(index);

        $("#" + index).remove();

    }
    function markAsComplete(index) {
        $('#' + index).css({ 'text-decoration': 'line-through' })
    }

    function setUserName(name) {
        $("#userName").text("Name: " + name);
    }
    function setUserEmail(email) {
        $("#userEmail").text("E-mail: " + email);
    }
    function setUserTodo(amount) {
        $("#userTodos").text("Todos: " + amount);

    }
    function infoText(text) {
        $("#info").text(text);
    }

    return {
        addLi,
        deleteLi,
        markAsComplete,
        setUserEmail,
        setUserName,
        setUserTodo,
        infoText,
        showRegister,
        hideRegister
    }
})();

var ToDoListHandler = (function () {

    //Adds an item to the todolist with and itemtext and a prio
    function addItem(todoList, item, prio) {

        const historyStats = {
            dateCreated: new Date(),
            dateCompleted: undefined,
            timeSpent: undefined,
            priorityChanges: [],
        }

        // våra aktiviter som läggs i varje todolist element
        const todo = {
            activity: item,
            priority: prio,
            completed: false,
            history: historyStats
        }

        todoList.push(todo);


    }
    //Changes the current prio of an item. And pusches it to and history list
    function changePriority(todoList, index, newPrio) {
        priorityChange = {
            oldPriority: todoList[index].priority,
            newPriority: newPrio,
            dateChanged: new Date()
        }

        todoList[index].history.priorityChanges.push(priorityChange);
        todoList[index].priority = newPrio;
    }
    //Marks an item as complete.
    function markAsComplete(todoList, index) {
        todoList[index].completed = true;
        todoList[index].history.dateCompleted = new Date();

        let dateCreate = new Date(todoList[index].history.dateCreated);
        let dateFinish = todoList[index].history.dateCompleted;


        let timespent = (dateFinish - dateCreate);
        console.log(dateFinish.getTime());
        console.log(dateCreate.getTime());
        timespent = (timespent / 1000 / 60 / 60)
        console.log(timespent);

        todoList[index].history.timeSpent = timespent;

    }
    //Deletes an item from todolist.
    function deleteItem(todoList, index) {
        todoList.splice(index, 1);
    }
    //Gets an item from the todolist.
    function getItem(todoList, index) {
        itemToReturn = todoList[index];

        return itemToReturn;
    }

    //function that sort the to do-list
    function sortTodoList(todoList) {

        for (let i = 0; i < todoList.length - 1; i++) {

            checksLeft = (todoList.length - 1) - i;
            for (let y = 0; y < checksLeft; y++) {

                if (todoList[y].priority > todoList[y + 1].priority) {
                    const temp = todoList[y + 1].priority;
                    todoList[y + 1].priority = todoList[y].priority;
                    todoList[y].priority = temp;
                }
            }
        }
    }

    return {
        addItem,
        deleteItem,
        markAsComplete,
        changePriority,
        sortTodoList,
        getItem
    }

})();


$(document).ready(function () {

    $("#addTodos").hide();
    EventHandlers.init();
    UserStorage.init();
});