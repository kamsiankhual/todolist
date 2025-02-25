//Ui

const addbtn = document.getElementById('btn');
const form = document.getElementById('form');
const getul =document.getElementById('list-group');
const inputval = document.getElementById('inputval');
const getprogress =document.getElementById('progress');
const getprogressbar = document.getElementById('progress-bar');



form.addEventListener("submit",function(e){
    // console.log('hi');
    e.preventDefault();
    addtask();
});



function addtask(datadb){
    let text = inputval.value.trim();
    console.log(text);

    if(datadb){
        text = datadb.task;
    }

    if(text){


        const div= document.createElement('div');
        div.classList = 'div';
        const span = document.createElement('span');
        span.classList = "list-item";
        span.textContent = text;
        const itag = document.createElement('i');
        itag.classList = "fas fa-trash-alt";

        // console.log(div,span,itag);

        if(datadb && datadb.done){
            span.classList.add('completed');
        }
       

        div.append(span);
        div.appendChild(itag);
        getul.appendChild(div);

        loaddatabase();
       


        inputval.value = "";
        inputval.focus();

        div.addEventListener('click',linedelete);

    }
}


function linedelete(e){
    // console.log(e.target);

    if(e.target.classList.contains("list-item")){
        e.target.classList.toggle("completed");
        loaddatabase();
        
    }else if(e.target.classList.contains('fa-trash-alt')){
        e.target.parentElement.remove();
        loaddatabase();
        
    }
}


function loaddatabase(){
    const alltasks = document.querySelectorAll('.list-item');
    // console.log(alltasks);
    let lists = [];

    alltasks.forEach((atask)=>{
        lists.push({
            task:atask.textContent,
            done:atask.classList.contains('completed') //true if completed
        });
    });

    console.log(lists);
    localStorage.setItem("todo",JSON.stringify(lists));
    shownums(lists);

    

}


const getdatadbs = JSON.parse(localStorage.getItem('todo'));
console.log(getdatadbs);

getdatadbs.forEach((datadb)=>addtask(datadb));



function shownums(vals){
    console.log(getdatadbs);
    console.log(vals.length);

    
        const getnumstat = document.getElementById('numstat');
        const totaltasks = vals.length;
        const donetask = vals.filter(function(data){
                return data.done === true;
        });
             
        console.log(totaltasks);
        console.log(donetask.length);
            
        getnumstat.innerText = `${donetask.length} / ${totaltasks}`;

        const calwidth = (donetask.length/ totaltasks)*100;
        console.log(calwidth);

        getprogressbar.style.width =`${calwidth}%`;
    

}







