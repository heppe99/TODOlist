

var EventHandlers = (function () {
    //We need to declare tree overall variables in order to manage everything , 
    // to call the functions from other modules in this module  
    var todoList = [];
    let currentId = null;
    let signedIn = false;
   
    function init() {
        $("#addToListBtn").click(onClickAddItemTodo);

        //Let's group all our events here
        //We still need an event for pushing the complete button 
        $(document).on('click', '.deleteBtn', function () {

            ToDoListHandler.deleteItem(todoList, this.id);
            documentEdit.deleteLi(this.id + 100);
            UserStorage.updateUser(currentId, todoList);
        })

        //register event
        $("#registerBtn").click(function () {

            const name = $("#registerInputName").val();
            const email = $("#registerInputEmail").val();


            UserStorage.saveUser(name, email);
            const user = UserStorage.getUserByEmail(email);
            todoList = user.todoList;
            currentId = user.id;
            signedIn = true;
            alert("You can start using your todo-list");

        });
        //sign up event
        $(".loginBtn").click(function () {
            const email = $("#loginInput").val();
            let user = UserStorage.getUserByEmail(email);
            
            if (user === null) {
                alert("Sign up first");
            }
            else {
                todoList = user.todoList;
            
                for (const i in todoList) {
                    const todoItemInHtml = (todoList[i].activity + " | Prio: " + todoList[i].priority + " | Complete: " + todoList[i].completed)
                    documentEdit.addLi(todoItemInHtml, i);
                }
                //We need to set some values at this point so the user can 
                // start adding items to his to do list
                signedIn = true;
                currentId = user.id; 
                alert("You can manage your todo's now")
                
            }
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

            const currentItem = todoList[todoList.length - 1];
            const currentIndex = todoList.length - 1;
            //Creates string of html 
            const todoItemInHtml = (currentItem.activity + " | Prio: " + currentItem.priority + " | Complete: " + currentItem.completed)
            //Sends string into Addli so we can view our newly added item on screen
            documentEdit.addLi(todoItemInHtml, currentIndex);
            //Important: we need to save the updated to do list with its user to local storage 
            UserStorage.updateUser(currentId, todoList);
        }
        else {
            alert("Login first");
        }
    }


    return { init }

})();

// Here I grouped together Khaleds code in a user storage manager
var UserStorage = (function () {

    var userList = [];

    function init() {
        const listUsers = localStorage.getItem("UserListLocalStorage");
        userList = JSON.parse(listUsers);

        if (userList === null) {
            userList = [];
        }
    }

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
                alert("Email already in use!");
                return null;
            }
        }
        // Create User object, used max id for initializing id 
        const user = {
            id: maxId + 1, 
            email:email,
            name: name,
            todoList: [],
        };


        userList.push(user);


        saveChangesUserList();
    }

    function getUserList() {
        return userList;
    }

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
    // we need to update the user and his updated to do list in local storage
    function updateUser(id, updatedTodoList) {
        for (const i in userList) {
            //Update if id is found
            if (userList[i].id === id) {
                userList[i].todoList = updatedTodoList;
            }
        }

        saveChangesUserList();
    }

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


    function addLi(text, index){
        btn = "<button class=\"deleteBtn\" id=\"" + index +"\" >X</button>"
        let liID = index + 100;
        completeButton = "<button class=\"completeBtn\" id=\"" + (index + 1000) +"\" >X</button>"
        $("#todoList").append("<li id=\"" + liID +"\" >" + text + completeButton+ btn + "</li>");
        
    
    }
    function deleteLi(index){
        console.log(index);
        
        $("#"+index).remove();
        
    }
    
    return {
        addLi,
        deleteLi  //add this so we'll be ablt to call it in script.js
    
    }
})();

var ToDoListHandler = (function() {
    

    function addItem(todoList, item, prio) {

        const historyStats = {
            dateCreated: new Date(),
            dateCompleted: undefined,
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

    function changePriority(todoList, index, newPrio) {
        priorityChange = {
            oldPriority: todoList[index].priority,
            newPriority: newPrio,
            dateChanged: new Date()
        }

        todoList[index].history.priorityChanges.push(priorityChange);
        todoList[index].priority = newPrio;
    }

    function markAsComplete(todoList, index) {
        todoList[index].completed = true;
        todoList[index].history.dateCompleted = new Date();
    }
    
    function deleteItem(todoList, index) {
        todoList.splice(index, 1);
    }

    function getItem(todoList, index){
        itemToReturn = todoList[index];

        return itemToReturn;
    }

    return {
        addItem,
        deleteItem,
        markAsComplete,
        changePriority,
        getItem
    }

})();

// we need to initialize two modules... userstorage to get the userlist !
$(document).ready(function () {
    EventHandlers.init();
    UserStorage.init();
});