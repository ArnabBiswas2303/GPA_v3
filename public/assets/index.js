let popUp = document.getElementById("pop-up-bg");
let exam = document.getElementById("exam");
function showSem(){
    popUp.style.display = "block"
}
function hideSem(){
    exam.textContent = document.getElementById("Nov-Dec-2018").textContent;
    popUp.style.display = "none"
    document.getElementById("hidden-input").value = exam.textContent;
}
let tinput = document.querySelector('.tinput');
function validateMyForm()
{    
    $body = $("body");
    $body.addClass("loading");      
    let bool = true;
    $.ajax({
        type: "POST",
        url: "/",
        async: false,        
        data:{ 
            username:tinput.value,
            semester:exam.textContent,
        },                
        }).done(function(data){
            $body.removeClass("loading");
		    if(data == "undefined"){
                bool = false;
                tinput.value = '';
                alert("Invalid Registration Number!");
            }else{
                bool = true;
            }
        });
    return bool; 
}
