var todoList = [];

var EventHandlers = (function(){

    function init(){
        $("#addToListBtn").click(onClickAddItemTodo);

    }
    function onClickAddItemTodo(){
        const inputItem = $("#inputItemToList").val();
        const prioItem = $("#inputPrioItem").val();
        
        ToDoListHandler.addItem(todoList, inputItem, prioItem);

        const currentItem = todoList[todoList.length - 1]
        const todoItemInHtml = (currentItem.activity + " " + currentItem.priority + " " + currentItem.completed)
        documentEdit.addLi(todoItemInHtml);

    }

    return{init}



})();


$(document).ready(function(){
    EventHandlers.init();
});