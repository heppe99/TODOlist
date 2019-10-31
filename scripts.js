

function User(){
    this.id
    this.email
    this.name
    this.todolist = []
}

let userList = [];

var UserManagement = (function(){

    function addUser(name, email){

        user = new User();
        userList = getUser();

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
        const userString = JSON.stringify({users: userList});
        localStorage.setItem("user", userString);
    }
 
    function getUser(){
        const userString = localStorage.getItem("user");

        if (userString.length < 1){
            console.log("No users in localstorage");
            return userList;
        }

        const user = JSON.parse(userString);
        
        
        return user;
    }


    return{
        addUser,
        getUser
    }

})();
