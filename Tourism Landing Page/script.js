     //Details
const destinations = document.querySelectorAll(".destination");
destinations.forEach(d => {
    const image = d.querySelector("img");
    const info = d.querySelector(".details");
    const btnClose = info.querySelector(".btn-close");

    image.addEventListener("mouseover", () => {
        info.style.display = "block";
    });
     image.addEventListener("mouseout", () => {
        info.style.display = "none";
    });
});

        //input focus border
const inputs=document.querySelectorAll("#signup input,#login input,.message-us input");
const textA=document.querySelector(".message-us textarea");
 textA.addEventListener("focus",()=>{
        textA.style.borderColor = "rgb(60,110,253)";
    });

    textA.addEventListener("blur",()=>{
         textA.style.borderColor = "rgb(204, 204, 204)";
    });

inputs.forEach(input=>{
    input.addEventListener("focus",()=>{
        input.style.borderColor = "rgb(60,110,253)";
    });
   
    input.addEventListener("blur",()=>{
        input.style.borderColor = "rgb(204, 204, 204)";
    });
    
});

        //signUp modal show-hide Password
const pass=document.getElementById("password");
const chkBox=document.getElementById("chkBox");
const changeLabel=document.querySelector(".form-check-label");
    chkBox.addEventListener("change", () => {
    pass.type = chkBox.checked ? "text" : "password";
    changeLabel.lastChild.textContent=chkBox.checked ? "Hide Password" : "Show Password";
});

       //login modal show-hide Pasword
const loginPass=document.getElementById("loginPassword");
const loginChkBox=document.getElementById("loginChkBox");
const loginChangeLabel=document.querySelector("#login .form-check-label");
        loginChkBox.addEventListener("change", () => {
        loginPass.type = loginChkBox.checked ? "text" : "password";
        loginChangeLabel.lastChild.textContent=loginChkBox.checked ? "Hide Password" : "Show Password";
});

