let text = "";
let x = "";
let y = "";
let op;
let operators = ["x","÷","-","+"];
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

//functions

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
            return Number(x) + Number(y);
    
        case "-":
            return x-y;
            
        default:
            return x;
    }
}

function showResult(){
    x = Number(calculate(op,x,y))
    x = (x>999999999999?`${(x.toPrecision(9))}`:`${Number(x.toPrecision(12))}`)
    y = "";
    text = `${x}`;
    displayContent(text);
}

function canInsertDecimal(target){
    if((target.id == ".") && ((x.includes(".") && y == "") ||  y.includes("."))){
        return false;
    }
    else{
        return true;
    }
}

// main

mainBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(operators.some(item => item == target.id)){
        if(operators.some(item=> text.includes(item))){
            showResult()
        }
        op = target.id;
    }
    if(target.id != "mainBtns" && target.id != "=" && canInsertDecimal(target)){
        text += target.id;
        if((text.includes(op) && target.id != op)){
            y += target.id;
            console.log("y")
            console.log(y)
        }
        else if(target.id!= op){
            x += target.id
            console.log("x")
            console.log(x)
        }
        displayContent(text);
    }
    if((target.id == "=" && y != "")){
        showResult()
    }
});

topBtns.addEventListener("click",(e)=>{
    let target = e.target;
    if(target.id == "back"){  
        if((text.includes(op))){
            y = y.slice(0, -1);
            console.log("y")
            console.log(y)
        }
        else{
            x = x.slice(0, -1);
            console.log("x")
            console.log(x)
        }  
        text = `${text.slice(0,text.length-1)}`;
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



