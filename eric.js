//You can create a todoList = [] in the console to try it...  

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

