let buttons=document.querySelectorAll("button");
let input=document.querySelector("input");

let btnArray=Array.from(buttons);
let display="";
btnArray.forEach(button=>{
    button.addEventListener("click",(e)=>{
        if(button.classList.contains("backspace"))
        {
            display = display.slice(0, -1);
            input.value = display;
        }
        else if(button.innerText== "=")
        {
            try{
            display = eval(display);
            input.value = display;
            }
            catch{
                input.value = "Error";
                display = "";
            }
        }
        else if(button.innerText == "C"){
            display = "";
            input.value = display;
        }
        else{
            display += button.innerText;
            input.value = display;
        }
    })
})