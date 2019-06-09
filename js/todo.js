var todoList = [{id:0,title:"Learn something",desc:"Learn something new",urgent:false},
                {id:1,title:"Finish your work",desc:"Finish everything you have to do",urgent:true},
                {id:2,title:"Tune this CSS",desc:"Tune CSS of this page",urgent:false}];

var savedTasks = JSON.parse(localStorage.getItem("todo"));
if(savedTasks != null) todoList = savedTasks;

$(document).ready(function(){showTodo()});

function showTodo(){
    // Add urgent first
    for(var i = 0; i < todoList.length; i++){
        if(!todoList[i].urgent) continue;
        var todoNode = document.createElement("li");
        todoNode.id = "todo_" + i;
        todoNode.classList.add("urgent");
        var todoSpan = document.createElement("span");
        todoSpan.classList.add("fa-li");
        var todoIcon = document.createElement("i");
        todoIcon.classList.add("fas");
        todoIcon.classList.add("fa-asterisk");
        todoSpan.appendChild(todoIcon);
        todoNode.appendChild(todoSpan);
        todoNode.setAttribute("title",todoList[i].desc);
        todoNode.appendChild(document.createTextNode(todoList[i].title));
        todoNode.setAttribute("onclick","clickTodo("+i+")")
        $('#todoList').append(todoNode);
    }
    // Add non-urgent
    for(var i = 0; i < todoList.length; i++){
        if(todoList[i].urgent) continue;
        var todoNode = document.createElement("li");
        todoNode.id = "todo_" + i;
        var todoSpan = document.createElement("span");
        todoSpan.classList.add("fa-li");
        var todoIcon = document.createElement("i");
        todoIcon.classList.add("fas");
        todoIcon.classList.add("fa-circle");
        todoSpan.appendChild(todoIcon);
        todoNode.appendChild(todoSpan);
        todoNode.setAttribute("title",todoList[i].desc);
        todoNode.appendChild(document.createTextNode(todoList[i].title));
        todoNode.setAttribute("onclick","clickTodo("+i+")")
        $('#todoList').append(todoNode);
    }
    if(todoList.length == 0) $("#header-separator").css("display","none");
}

function refreshTodo(){
    var i = 0;
    while($("#todoList").children().length > 0){
        $("#todo_"+i).remove();
        i++;
    }
    showTodo();
    localStorage.setItem("todo", JSON.stringify(todoList));
    if(todoList.length == 0){
        $("#header-separator").css("display","none");
    }
}

function clickTodo(id){
    $('#todo_'+id).css("text-decoration", "line-through");
    $('#todo_'+id).css("background-color", "gray");
    $('#todo_'+id).css("transform","scaleY(0)");
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
    todoList.push({id:id,title:name,desc:desc,urgent:urg});
    refreshTodo();
    if(todoList.length == 1) $("#header-separator").css("display","block");
}

function getNextTaskID(){
    return todoList.length;
}