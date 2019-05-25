let popUp = document.getElementById("pop-up-bg");
let exam = document.getElementById("exam");
function showSem(){
    popUp.style.display = "block"
}
function closePopUp(){
    popUp.style.display = "none";
}
function hideSem(name){
    exam.textContent = document.getElementById(name).textContent;
    popUp.style.display = "none"
    document.getElementById("hidden-input").value = exam.textContent;
}
let tinput = document.querySelector('.tinput');
function showLoader() {
    $("#progressbar").css("display", "");
}

function hideLoader() {
    setTimeout(function () {
        $("#progressbar").css("display", "none");
    }, 1000);
}
async function validateMyForm ()
{                
    let bool = true;
    let promise = $.ajax({
        type: "POST",
        url: "/",
        async: true,        
        beforeSend: function () { showLoader(); },
        success: function () { hideLoader(); },
        data:{ 
            username:tinput.value,
            semester:exam.textContent,
        }                
        })
    return bool; 
}
