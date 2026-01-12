const Btns = document.querySelectorAll("button");
Btns.forEach((btn)=>{
    btn.textContent = `${btn.id}`;
})