/*

DO NOT USE THIS.
THIS IS JUST A PLAYGROUND FOR ME
//HAMPUS


*/
function User(){
    this.id
    this.email
    this.name
    this.todolist = [];
}

function TODOItem(){
    let date = new Date();
    this.todo;
    this.priority;
    this.dateAdded = date.constructor()

}
function TODOlist(){
    this.name;
}


var TODOManager = (function(){

    function createTodo(user, itemString, itemPriority, index){
        td = new TODOItem();
        td.todo = itemString;
        td.priority = itemPriority;

        user.todolist[index].push(td);

        console.log("Item added to " + userList.todolist[index].name);
        LocalStorageHelper.addUser(userList);
    }
    function createTodoList(user, name){
        tdList = new TODOlist();
        tdList.name = name;
        user.todolist.push(tdList);

        console.log("List Created with name " + tdList.name);
        console.log(user);     
    }

    return{
        createTodo,
        createTodoList
        
    }

})();

var LoginManager = (function(){

    var currentLogIn;

    function login(email){
        
        users = LocalStorageHelper.getUser();

        for(let i = 0; i < users.length; i++){

            if(users[i].email === email){
                currentLogIn = users[i];
                break;
            }
        }

    }
    function getUserLoggedIn(){

        return currentLogIn;
    }

    return{
        login,
        getUserLoggedIn
    }

})();

var UserManagement = (function(){

    function addUser(name, email){
        let userList = LocalStorageHelper.getUsers();
        user = new User();

        for(let i = 0; i < userList.length; i++){
            
            if (userList[i].email === email){
                console.log("Email already registerd.")
                console.log("Try to login or use another Email.");
                return;
            }
        }

        user.name = name;
        user.email = email;
        userList.push(user);
        LocalStorageHelper.addUser(userList);
    }
    function deleteUser(email){

    }

    function addUserTodolistItem(email, itemString, itemPriority, todolistIndex){
        let userList = LocalStorageHelper.getUsers();

        for(let i = 0; i < userList.length; i++){
            if (userList[i].email === email){
                TODOManager.createTodo(userList[i], itemString, itemPriority, todolistIndex);
                LocalStorageHelper.updateUsers();
                
            }
        }
    }
    function addUserTodolist(email, itemString){
        userList = LocalStorageHelper.getUsers();

        for(let i = 0; i < userList.length; i++){
            if (userList[i].email === email){
                TODOManager.createTodoList(userList[i], itemString);       
            }
        }
    }

    return{
        addUser,
        addUserTodolistItem,
        addUserTodolist

    }

})();

var LocalStorageHelper = (function(){
    let userList = [];

    function getUsers(){

        const userString = localStorage.getItem("user");

        if(userString === null){
            console.log("No users in localstorage");
            return userList;
        }

        const temp = JSON.parse(userString);

        userList = temp.users;
        return userList;

    }

    function addUser(userList){
        const userString = JSON.stringify({users: userList});
        localStorage.setItem("user", userString);

    }
    function addList(){

    }
    function updateUsers(userList){
        localStorage.clear();
        const userString = JSON.stringify({users: userList});
        localStorage.setItem("user", userString);
    }


    return{
        getUsers,
        addUser,
        updateUsers

    }

})();
