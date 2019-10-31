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
        const currentIndex = todoList.length -1;

        const todoItemInHtml = (currentItem.activity + " | Prio: " + currentItem.priority + " | Complete: " + currentItem.completed)
        
        documentEdit.addLi(todoItemInHtml, currentIndex);
        
    }


    return{init}

})();


$(document).ready(function(){
    EventHandlers.init();
});