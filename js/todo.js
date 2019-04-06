var todoList = [{id:0,title:"Learn something",desc:"Learn something",urgent:0},
                {id:1,title:"Finish this",desc:"Finish this todo list",urgent:1},
                {id:2,title:"Tune CSS",desc:"Tune CSS of this page",urgent:0}];

$(document).ready(function(){showTodo()});

function showTodo(){
    for(var i = 0; i < todoList.length; i++){
        var todoNode = document.createElement("li");
        todoNode.appendChild(document.createTextNode(todoList[i].title));
        todoNode.id = "todo_" + i;
        todoNode.setAttribute("onclick","clickTodo("+i+")")
        $('#todoList').append(todoNode);
    }
}

function refreshTodo(){
    var i = 0;
    while($("#todoList").children().length > 0){
        $("#todo_"+i).remove();
        i++;
    }
    showTodo();
}

function clickTodo(id){
    $('#todo_'+id).css("text-decoration", "line-through");
    $('#todo_'+id).css("background-color", "gray");
    for(var i = id+1; i < todoList.length; i++){
        todoList[i].id--;
        console.log(todoList[i].id);
    }
    todoList.splice(id,1);
    setTimeout(function(){
        refreshTodo();
    }, 2000);
}

function add(){
    
}