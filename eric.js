// Create an array that serves as the container for our objects
let listItems = [];

// Here we create our constructor - blueprint for objects -
// We can add several more properties later if needed
function ToDo(activity, priority) {

    this.activity = activity;
    this.priority = priority;    

}

// Create module in which we group together our to do-list functions   
var ToDoListHandler = (function () {

    // Function creates to do-object by calling constructor and pushing it to the array
    function addItem(itemString, itemPriority) {
        
        const todo = new ToDo(itemString, itemPriority);
        listItems.push(todo);

    }

    function deleteItem(indexNumber) {
  
        listItems.splice(indexNumber, 1);
    }
    // Function -for the time being - to test loggin an item to the console   
    function logItem (indexNumber) {

        console.log("Activity: " + listItems[indexNumber].activity + " "
        + "Prio: " + listItems[indexNumber].priority);

    }

    return {
        addItem,
        deleteItem,
        logItem,
    }

})();