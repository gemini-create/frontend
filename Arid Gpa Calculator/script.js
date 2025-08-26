const add=document.getElementById("plus");
const tableBody=document.querySelector("tbody");

add.addEventListener("click",()=>{
    const newRow=document.createElement("tr");

    const td1=document.createElement("td");
    td1.innerHTML = `<input name="subject" type="text" placeholder="Subject">`;
    
    const td2=document.createElement("td");
    td2.innerHTML = `<input class="hours" name="hours" type="number" min="1" max="5" placeholder="Credit">`;
    
    const td3=document.createElement("td");
    td3.innerHTML=`<input class="marks" name="marks" type="number" min="1" max="100" placeholder="Marks">`;

    const td4 = document.createElement("td");
    td4.innerHTML = `<i class="cross fa fa-times-circle"></i>`;

    newRow.classList.add("record");
    newRow.appendChild(td1);
    newRow.appendChild(td2);
    newRow.appendChild(td3);
    newRow.appendChild(td4);

    tableBody.appendChild(newRow);
});

tableBody.addEventListener("click",(e)=>{
        if (e.target.classList.contains("cross")) { 
        e.target.closest("tr").remove();
    }
});

function getQP(hrs,marks){
    // Define QP tables for each credit hour
    const tables = {
        1: {20:4,19:4,18:4,17:4,16:4,15:3.67,14:3.33,13:3,12:2.67,11:2.33,10:2,9:1.5,8:1},

        2: {40:8,39:8,38:8,37:8,36:8,35:8,34:8,33:8,32:8,31:7.67,30:7.33,29:7,28:6.67,27:6.33,26:6,25:5.67,24:5.33,23:5,22:4.67,21:4.33,20:4,19:3.5,18:3,17:2.5,16:2},

        3: {60:12,59:12,58:12,57:12,56:12,55:12,54:12,53:12,52:12,51:12,50:12,49:12,48:12,47:11.67,46:11.33,45:11,44:10.67,43:10.33,42:10,41:9.67,40:9.33,39:9,38:8.67,37:8.33,36:8,35:7.67,34:7.33,33:7,32:6.67,31:6.33,30:6,29:5.5,28:5,27:4.5,26:4,25:3.5,24:3},

        4: {80:16,79:16,78:16,77:16,76:16,75:16,74:16,73:16,72:16,71:16,70:16,69:16,68:16,67:16,66:16,65:16,64:16,63:15.67,62:15.33,61:15,60:14.67,59:14.33,58:14,57:13.67,56:13.33,55:13,54:12.67,53:12.33,52:12,51:11.67,50:11.33,49:1,48:10.67,47:10.33,46:10,45:9.67,44:9.33,43:9,42:8.67,41:8.33,40:8,39:7.5,38:7,37:6.5,36:6,35:5.5,34:5,33:4.5,32:4},

        5: {100:20,99:20,98:20,97:20,96:20,95:20,94:20,93:20,92:20,91:20,90:20,89:20,88:20,87:20,86:20,85:20,84:20,83:20,82:20,81:20,80:20,79:19.67,78:19.33,77:19,76:18.67,75:18.33,74:18,73:17.67,72:17.33,71:17,70:16.67,69:16.33,68:16,67:15.67,66:15.33,65:15,64:14.67,63:14.33,62:14,61:13.67,60:13.33,59:13,58:12.67,57:12.33,56:12,55:11.67,54:11.33,53:11,52:10.67,51:10.33,50:10,49:9.5,48:9,47:8.5,46:8,45:7.5,44:7,43:6.5,42:6,41:5.5,40:5}
    };

    if (tables[hrs][marks] !== undefined) return tables[hrs][marks];
}

function calculateGPA(){
    const maxHours = 19;
    let sumQP = 0;
    let totalHours = 0;

    const creditHours = [];
    const allMarks = [];
    
    const courses=document.querySelector("#courses").value;

    // collect data from table
    document.querySelectorAll(".hours").forEach(hour => {
        const hrs = parseInt(hour.value);
        creditHours.push(hrs);
        totalHours += hrs;
    });

    if(totalHours > maxHours){
        let error = document.querySelector(".error");
        error.textContent = "Maximum Credit Hours per Semester allowed are 19";
        error.style.display = "block";
        return;
    }

    document.querySelectorAll(".marks").forEach(mark => {
        const m=parseFloat(mark.value);
        allMarks.push(m);
    })

    // calculate QP
    for(let i = 0; i < courses; i++){
        const hrs = creditHours[i];
        const marks = allMarks[i];

        const QP=getQP(hrs,marks);
        sumQP+=QP;

        console.log(`Course ${i+1}: Marks=${marks}, Credit=${hrs}, QP=${QP.toFixed(2)}`);
    }

    const gpa = sumQP/ totalHours;
    const answer = document.querySelector(".answer p");
    const name = document.querySelector("#name").value;
    const semester=document.querySelector("#semester").value;
    answer.innerHTML = `${name}'s GPA of Semester ${semester} is ${gpa.toFixed(2)}`;
    answer.parentElement.style.display="block";
    console.log(`GPA is: ${gpa.toFixed(2)}`);
}

const submit=document.querySelector(".btn-success");
submit.addEventListener("click",calculateGPA);