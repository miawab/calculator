document.addEventListener("dblclick",(e)=>{e.preventDefault()}) //idk man check this

let text = "";
let x = 0;
let y = 0;
let op;
let textArray = [];
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

function calculate(op,x,y){
    switch (op) {
        case "x":
            return x*y;
    
        case "÷":
            return x/y;

        case "+":
            return x+y;
    
        case "-":
            return x-y;
    }
}

mainBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.id == "x"|| target.id == "÷"|| target.id == "-"|| target.id == "+"){
        op = target.id;
        console.log("saved booyah")
    }
    if(target.id != "mainBtns"){
        text += target.id;
        textArray = text.split("")
        if((textArray.includes(op) && (target.id != op && target.id != "="))){
            y += target.id;
            console.log("ye")
            console.log(y)
        }
        else if(target.id!= op && target.id != "="){
            x += target.id
            console.log("no")
            console.log(x)
        }
        displayContent(text);
    }
    if(target.id == "="){
        x = calculate(op,x,y)
        displayContent(x);
        console.log(x);
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
        x = 0;
        y = 0;
        op = ""
        content.textContent = text;
    }
});



