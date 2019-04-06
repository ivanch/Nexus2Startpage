var todoList = [{id:0,title:"Learn something",desc:"Learn something",urgent:false},
                {id:1,title:"Finish this",desc:"Finish this todo list",urgent:true},
                {id:2,title:"Tune CSS",desc:"Tune CSS of this page",urgent:false}];

todoList = JSON.parse(localStorage.getItem("todo"));

$(document).ready(function(){showTodo()});

function showTodo(){
    // Add urgent first
    for(var i = 0; i < todoList.length; i++){
        if(!todoList[i].urgent) continue;
        var todoNode = document.createElement("li");
        todoNode.id = "todo_" + i;
        var todoSpan = document.createElement("span");
        todoSpan.appendChild(document.createTextNode(todoList[i].title));
        todoSpan.setAttribute("onclick","clickTodo("+i+")")
        todoSpan.title = todoList[i].desc;
        todoNode.appendChild(todoSpan);
        $('#todoList').append(todoNode);
    }
    // Add non-urgent
    for(var i = 0; i < todoList.length; i++){
        if(todoList[i].urgent) continue;
        var todoNode = document.createElement("li");
        todoNode.id = "todo_" + i;
        var todoSpan = document.createElement("span");
        todoSpan.appendChild(document.createTextNode(todoList[i].title));
        todoSpan.setAttribute("onclick","clickTodo("+i+")")
        todoSpan.title = todoList[i].desc;
        todoNode.appendChild(todoSpan);
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
    localStorage.setItem("todo", JSON.stringify(todoList));
}

function clickTodo(id){
    $('#todo_'+id).css("text-decoration", "line-through");
    $('#todo_'+id).css("background-color", "gray");
    $('#todo_'+id).css("font-size", "0em");
    for(var i = id+1; i < todoList.length; i++){
        todoList[i].id--;
    }
    todoList.splice(id,1);
    setTimeout(function(){
        refreshTodo();
    }, 750);
}

function addTask(event){
    var id = getNextTaskID();
    var name = $("#taskTitle").val();
    var desc = $("#taskDesc").val();
    var urg = $("#taskUrgent").is(":checked");
    console.log(name);
    todoList.push({id:id,title:name,desc:desc,urgent:urg});
    refreshTodo();
}

function getNextTaskID(){
    return todoList.length;
}