let popUp = document.getElementById("pop-up-bg");
let span = document.querySelector("#grade span");
let sub;
$(document).ready(function(){    
    sub = result;
    addGrid(sub);
    function addGrid(sub){
        let count = 1;        
        for(let key in sub){        
            $('#result').append($('<div/>',{ class : `row ${count}`}));
            $(`.${count}`).append($('<div>', {text: key.slice(7)}));
            $(`.${count}`).append($('<div>', {text: sub[key][3]}));                        
            count++;
        }        
        $(`.row>div:nth-child(2n)`).addClass('animate');
    }          
});

function showPop(){
    popUp.style.display = "block";
    $(`.row>div:nth-child(2n)`).removeClass('animate');
}
function hidePop(ele){ 
    let text = span.textContent;
    let changeTo = $(ele).text().toLowerCase();    
    let i;
    if(changeTo == 'grade'){
        i=3;
    }else if(changeTo == 'semester'){
        i=1;
    }else if(changeTo == 'total'){
        i=2;
    }else {
        i=0;
    }
    let count = 1;    
    for(let key in sub){                
        $(`.${count}>div:nth-child(2n)`).text(`${sub[key][i]}`)  ;
        count++;
    }        
    span.textContent = $(ele).text();
    popUp.style.display = "none";      
    ele.closest('ul').remove();  
    $('#pop-up').append(`<ul>
        <li id="${text.toLowerCase()}" onclick="hidePop(this)">${text}</li>
    </ul>`);    
    $(`.row>div:nth-child(2n)`).addClass('animate');
}