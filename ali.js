let itemlist = [];

var module = (function () {
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
        const text2 = document.getElementById("ourh1");
        text2.innerText = text; 
    }
    function changeP(text){
        const text2 = document.getElementById("pText");
        text2.innerText= text;
    }
    function addLi(text){
        const text2 = document.getElementById("todoList");
        text2.innerHTML += "<li>" + text + "</li>"
    }
    return {
        changeh1,
        changeP,
        addLi
    }
})();