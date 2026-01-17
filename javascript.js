document.addEventListener("dblclick",(e)=>{e.preventDefault()}) //idk man check this

let text = "";
let x = "";
let y = "";
let op;
let textArray = [];
let xArray = [];
let yArray = [];
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
    if(text.length > 14){
        let i = text.length - 14;
        content.textContent = text.slice(i, 14+i);
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
    }
    xArray = x.split("");
    yArray = y.split("");
    if(target.id != "mainBtns" && target.id != "=" && (!(target.id == "." && (xArray.includes(".")) && y =="") && !(target.id == "." && yArray.includes(".")))){
        text += target.id;
        textArray = text.split("");
        if((textArray.includes(op) && (target.id != op && target.id != "="))){
            y += target.id;
            console.log("y")
            console.log(y)
        }
        else if(target.id!= op && target.id != "="){
            x += target.id
            console.log("x")
            console.log(x)
        }
        displayContent(text);
    }
    if(target.id == "=" && y != 0){
        x = calculate(op,x,y)
        x = `${Number(x.toPrecision(10))}`
        y = "";
        text = `${x}`;
        textArray = text.split("");
        displayContent(text);
    }
});

topBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.id == "back"){  
        xArray = x.split("");
        yArray = y.split("");
        if((!(target.id == "." && (xArray.includes(".")) && y =="") && !(target.id == "." && yArray.includes(".")))){
            if((textArray.includes(op))){
                y = `${Math.floor(y/10)}`;
                console.log("y")
                console.log(y)
            }
            else{
                x = `${Math.floor(x/10)}`;
                console.log("x")
                console.log(x)
            }  
        }
        else{
            if((textArray.includes(op))){
                y = `${Math.floor(y/10)}`;
                console.log("y")
                console.log(y)
            }
            else{
                x = `${Math.floor(x/10)}`;
                console.log("x")
                console.log(x)
            } 
        }  
        t = `${text.slice(0,text.length-1)}`;
        textArray = text.split("");
        displayContent(text);
    }
    if(target.id == "AC"){
        text = "";
        x = "";
        y = "";
        op = ""
        content.textContent = text;
    }
});



