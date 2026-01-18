/* if u are revising heres what to fix 
    add support for minus and exponent form, since
    both include syntax - and + that break code.
*/

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
    if(text.length > 10){
        let i = text.length - 10;
        content.textContent = text.slice(i, 10+i);
    }
    else{content.textContent = text;}
}

function calculate(op,x,y){
    if(y==0 && op =="÷"){
        content.textContent = text
        return x;
    }
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
    x = (x>9999999?`${(x.toPrecision(4))}`:`${Number(x.toPrecision(7))}`)
    y = "";
    text = `${x}`;
    displayContent(text);
}

function canInsertDecimal(id){
    if((id == "." || id == "Decimal") && ((x.includes(".") && y == "") ||  y.includes("."))){
        return false;
    }
    else{
        return true;
    }
}

function normaliseId(id){
    if(id == "/"){
        id = "÷";
    }
    if(id == "*"){
        id = "x";
    }
    if(id == "Enter"){
        id = "=";
    }
    if(id == "Decimal"){
        id = ".";
    }
    if(id == "Backspace"){
        id ="back";
    }
    return id;
}

function canInsertKey(id){
    switch(id){
        case "1":
            return true;
        case "2":
            return true;
        case "3":
            return true;
        case "4":
            return true;
        case "5":
            return true;
        case "6":
            return true;
        case "7":
            return true;
        case "8":
            return true;
        case "9":
            return true;
        case ".":
            return true;
        case "Decimal":
            return true;
        case "+":
            return true;
        case "-":
            return true;
        case "":
            return true;
        case "÷":
            return true;
        case "x":
            return true;  
        default:
            return false;
    }
}

//main 

function mainBtnEvent(id){
    id = normaliseId(id);
    if(operators.some(item => item == id)){
        if(operators.some(item=> text.includes(item))){
            showResult()
        }
        op = id;
    }
    if(id != "mainBtns" && id != "=" && canInsertDecimal(id) && canInsertKey(id)){
        text += id;
        if((text.includes(op) && id != op)){
            y += id;
            console.log("y")
            console.log(y)
        }
        else if(id!= op){
            x += id
            console.log("x")
            console.log(x)
        }
        displayContent(text);
    }
    if((id == "=" && y != "")){
        showResult()
    }
}

function topBtnEvent(id){
    id = normaliseId(id);
    if(id == "back"){  
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
        if(text==""){
            x = "";
            y = "";
            op = null;
        content.textContent = text;
    }  
    }
    if(id == "AC"){
        text = "";
        x = "";
        y = "";
        op = null;
        content.textContent = text;
    }
}

// events
mainBtns.addEventListener("click",(e)=>{
    let target = e.target;
    let id = target.id;
    mainBtnEvent(id)
});


topBtns.addEventListener("click",(e)=>{
    let target = e.target;
    let id = target.id;
    topBtnEvent(id)
});

document.addEventListener("keydown",(e)=>{
    let id = e.key;
    console.log(id)
    mainBtnEvent(id);
    e.preventDefault()
});

document.addEventListener("keydown",(e)=>{
    let id = e.key;
    topBtnEvent(id);
    e.preventDefault()
});



