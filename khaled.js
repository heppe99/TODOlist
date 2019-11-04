// This Module is to manage the users info
var EditUsers = (function () {


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


    // Show each user info in userList
    function showUser() {

        userList.forEach(name => console.log(name));
    }



    return {

        userList,
        addUser,
        removeUser,
        showUser,
    }

})();






































// This Module is to manipulate the DOM elements
var DocumentEdit = (function () {




    return {

    }

})();


// This module is for event listeners
var EventHandlers = (function () {
    function init() {


    }

    // returns our initial event
    return {
        init
    }
})();

// This loader the web page before starting our event 
window.addEventListener("DOMContentLoaded", EventHandlers.init);