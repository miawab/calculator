let text = "";
const Btns = document.querySelectorAll("button");
Btns.forEach((btn)=>{
    btn.textContent = `${btn.id}`;
    if(btn.id == "back"){
        btn.textContent = "⌫"
    }
});

const content = document.querySelector("#content");
const mainBtns = document.querySelector("#mainBtns");
const topBtns = document.querySelector("#topBtns");

function displayContent(text){
    if(text.length > 31){
        let i = text.length - 31;
        content.textContent = text.slice(i, 31+i);
    }
    else{content.textContent = text;}
}

mainBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.id != "mainBtns"){
        text += target.id;
        displayContent(text);
    }
});

topBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.id == "back"){
        text = text.slice(0,text.length-1);
        displayContent(text);
    }
    if(target.id == "AC"){
        text = "";
        content.textContent = text;
    }
});


