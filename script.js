const addform = document.querySelector(".add");
const tasks = document.querySelector(".task");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");


function messageUpdate(){
    const textLength = tasks.children.length;
    messageSpan.textContent = `You have ${textLength} pending tasks!`;
}

messageUpdate();

addform.addEventListener("submit", event =>{
    event.preventDefault();
    const value = addform.task.value.trim();

    if(value.length){
        tasks.innerHTML += `<li>
                            <span>${value}</span>
                            <i class="bi bi-trash-fill delete"></i>
                            </li>`;

        addform.reset();

        console.log(value)
        messageUpdate();
    }
})

tasks.addEventListener("click", event=>{
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        messageUpdate();
    }
})


clearAll.addEventListener("click", event=>{
    const Taskitems = tasks.querySelectorAll("li");

    Taskitems.forEach(Items =>{
        Items.remove();
    })
    messageUpdate();
})



function filterTask(term){
    Array.from(tasks.children)
    .filter(task =>{
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach(task=>{
        task.classList.add("hide");
    })

    Array.from(tasks.children)
    .filter(task =>{
        return task.textContent.toLowerCase().includes(term);
    })
    .forEach(task=>{
        task.classList.remove("hide");
    })
}

searchForm.addEventListener("keyup", event=> {    
    const term = event.target.value.trim();
    filterTask(term);
})

searchForm.addEventListener("click", event=>{
    if(event.target.classList.contains("reset")){
        searchForm.reset();
        const term = searchForm.task.value.trim().toLowerCase();
        filterTask(term);
    }
})