var todoList = [];

var EventHandlers = (function() {

    // Lagrar inputs till dokument
    function init() {
        $("#addToListBtn").click(onClickAddItemTodo);
    }

    //tar värdet från första och andra textboxen
    function onClickAddItemTodo() {

        const inputItem = $("#inputItemToList").val();
        const prioItem = $("#inputPrioItem").val();

        if (prioItem > 5) {
            alert ("Priotieringen kan max vara 5");
            return;
        }
        if (prioItem < 1) {
            alert ("Prioriteringen behöver minst vara 1");
            return;
        }
        //tar in en todolist av en user,
        ToDoListHandler.addItem (todoList, inputItem, prioItem);
        const currentItem = todoList [todoList.length - 1];
        const currentIndex = todoList.length - 1;

        //uppdateras de två inputen till dokumentet
        const todoItemInHtml = (currentItem.activity + " | Prio: " + currentItem.priority + " | Complete: " + currentItem.completed)
        documentEdit.addLi(todoItemInHtml, currentIndex);
    }

    return { init }

})();

$(document).ready(function() {
    EventHandlers.init();
});