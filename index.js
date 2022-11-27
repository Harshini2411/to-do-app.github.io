// const { add } = require("nodemon/lib/rules");

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let addTasks = document.getElementById("addTasks");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let tasks = document.getElementById("tasks");
let msg = document.getElementById("msg");


form.addEventListener("submit", (e) =>{
  e.preventDefault();
  formValidation();
});


let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Please!! input some note here.";
  } else {
    msg.innerHTML = "";
    acceptData();
    addTasks.setAttribute("data-bs-dismiss", "modal");
    addTasks.click();
    //IIFE-Intermediate Invoked Functional Expression->fn runs onlt once
    (() => {
      addTasks.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}]; //creating objects


//collecting data from inputs
let acceptData = () => {

data.push({
 text: textInput.value,
 date: dateInput.value,
 description: textArea.value
});

localStorage.setItem("data",JSON.stringify(data));
  
  storeData();
};

let storeData = () => {
tasks.innerHTML="";
//x->new ip,y-> new index each item
data.map((x,y) => {
return(tasks.innerHTML+= `
      <div id=${y}>
                    <span class="fw-bold">
                    ${x.text}</span>
                    <span>${x.date}</span>
                    <p>${x.description}</p>

                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this);storeData()" class="fas fa-trash-alt"></i>
                    </span>
                </div>`);
});
  resetForm();
};

var deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id,1);
  localStorage.setItem("data",JSON.stringify(data));
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};


let editTask=(e)=>
{
let selTask=e.parentElement.parentElement; 
textInput.value = selTask.children[0].innerHTML;
  dateInput.value =selTask.children[1].innerHTML;
  textArea.value =selTask.children[2].innerHTML;
 deleteTask(e);
}


//another IIFE->whenever the page refreshes data doesn't get erases, instead it gets from local storage & pushes to data array obj

(()=>{
data=JSON.parse(localStorage.getItem("data")) || [];//json-parse formats data
storeData();
})();
