let itemlist = [];

var module = (function() {

    function addtolist (itemtoadd) {
        itemlist.push (itemtoadd);
    }

    function viewlist() {
        console.log(itemlist);
    }

    function removefromlist (elementindex) {
        itemlist.shift (elementindex);
    }

    return {
        addtolist,
        viewlist,
        removefromlist
    }
})();

var documentEdit = (function(){

    function changeh1 (text) {
        const text2 = document.getElementById ("ourh1");
        text2.innerText = text; 
    }

    function changeP (text) {
        const text2 = document.getElementById ("pText");
        text2.innerText= text;
    }

    function addLi (text, index) {
        btn = " <button class = \"deleteBtn\" id = \"btn" + index + "\" > X </button>" // Skapar en knapp som tar bort toods
        let liID = "li"+index; 
        $("#todoList").append ("<li id=\"" + liID + "\" >" + text + btn + "</li>")

        $('#btn' + index).click (function(){
            ToDoListHandler.deleteItem (todoList, index);
            deleteLi (liID);
        });
    }

    function deleteLi (index){
        console.log (index);
        $("#" + index).remove();
    }

    return {
        changeh1,
        changeP,
        addLi,
        deleteLi
    }

})();