function addTask(){
    const newTask=document.createElement('li')
    const taskList=document.getElementById('taskList')
    taskList.append(newTask);
    newTask.textContent=document.getElementById('inputTask').value
    document.getElementById('inputTask').value=""
   deleteTask(newTask);

    taskList.append(newTask);
}
function deleteTask(newTask){
    const deletbtn=document.createElement('button')
    deletbtn.textContent="Delete"

newTask.appendChild(deletbtn)
deletbtn.onclick=function(){
    newTask.remove()
}
}
