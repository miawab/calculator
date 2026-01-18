let text = "";
let x = "";
let y = "";
let op = null;
let operators = ["x","÷","-","+"];
let delayBy1Counter = 0;
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
    if(y=="-"||y=="+"){
        y="";
    }
    if(x=="-"||x=="+"){
        x="";
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
    delayBy1Counter = 0;
    op = null;
    text = `${x}`;
    displayContent(text);
}

function canInsertDecimal(id){
    if((id == ".") && ((x.includes(".") && y == "") ||  y.includes("."))){
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
        case "0":
            return true;
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
        case "+":
            return true;
        case "-":
            return true;
        case "÷":
            return true;
        case "x":
            return true;  
        default:
            return false;
    }
}

function isOperator(x,y,id){
    if(id=="+" || id=="-"){
        if(x != ""){
            if(op == null){
                return true;
            }
            else{
                if(y!=""){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }
    else{
        return true
    }
}

//main 

function mainBtnEvent(id){
    id = normaliseId(id);
    if(operators.some(item => item == id)){
        if(op=="-"||op=="+"){
            if(text.includes(op)&& y!=""){
            showResult()
            }
        }
        else if(text.includes(op)&& (operators.some(item => item == id))){
            if((id=="x"||id=="÷")){
                showResult()
            }
            if((id=="+"||id=="-")){
                if(delayBy1Counter>0){
                showResult()
                }
                delayBy1Counter++
            }
        }

        if(isOperator(x,y,id)){
            op = id;  
        }
    }
    if(id != "mainBtns" && id != "=" && canInsertDecimal(id) && canInsertKey(id)){
        text += id;
        if((op !== null && (id !== op || !isOperator(x,y,id)))){
            if(delayBy1Counter>0 || (id!="-" && id !="+")){
                y += id;
            }
            delayBy1Counter++
        }
        else if(id !== op){
            x += id
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
            if(y==""){
                op = null;
                delayBy1Counter = 0;
            }
            y = y.slice(0, -1);
        }
        else{
            x = x.slice(0, -1);
        } 
        text = `${text.slice(0,text.length-1)}`;
        displayContent(text);
        if(text==""){
            x = "";
            y = "";
            op = null;
            delayBy1Counter = 0;
        content.textContent = text;
    }  
    }
    if(id == "AC"){
        text = "";
        x = "";
        y = "";
        op = null;
        delayBy1Counter = 0;
        content.textContent = text;
    }
}

// events
mainBtns.addEventListener("click",(e)=>{
    let target = e.target;
    let id = target.id;
    mainBtnEvent(id);
    topBtnEvent(id);
});

document.addEventListener("keydown",(e)=>{
    let id = e.key;
    mainBtnEvent(id);
    topBtnEvent(id);
});




