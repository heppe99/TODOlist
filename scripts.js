

function User(){
    this.id
    this.email
    this.name
    this.todolist = []
}



var UserManagement = (function(){

    function addUser(name, email){

        user = new User();

        let userList = LocalStorageHelper.getUser();

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


    return{
        addUser
    }

})();


var LocalStorageHelper = (function(){
    let userList = [];

    function getUser(){
        const userString = localStorage.getItem("user");

        if(userString.length < 1){
            console.log("No users in localstorage");
            return userList;
        }

        const temp = JSON.parse(userString);

        userList = temp.users;
        return userList;

    }

    function addUser(){

        
    }

    return{
        getUser

    }


})();
