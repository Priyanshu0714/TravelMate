// to get the data from signin page
let signin_email=null
let signin_password=null
document.getElementById("submit-button").addEventListener("click",()=>{
    signin_email=document.getElementById("email").value.toLowerCase().trim()
    signin_password=document.getElementById("password").value.trim()
    // to check if the values are null
    if(!signin_email||!signin_password){
        change_placeholder()
        return;
    }
    if(!email_checker(signin_email)){
        document.getElementById("email").value=""
        return;
    }
    console.log("data checked")
    sendData(signin_email,signin_password);
    
})
// function to change the placeholder 
function change_placeholder(){
    document.getElementById("email").placeholder="required!"
        document.getElementById("email").classList.add("placeholder-red-400")
        document.getElementById("password").placeholder="required!"
        document.getElementById("password").classList.add("placeholder-red-400")
}

// function to check email is of valid type
function email_checker(email){
    try {
        temp=email.split("@")
        if(temp[1]=="cuchd.in" && temp.length===2){
            return 1
        }
        else{
            document.getElementById("fill-all-field").innerText="Please enter the valid cuchd email!"
            document.getElementById("fill-all-field").classList.replace("hidden","flex")
            document.getElementById("password-box").classList.replace("mb-6","mb-2")
            return 0
        }
    }catch (error) {
        document.getElementById("fill-all-field").innerText="Invalid Email format!"
        document.getElementById("fill-all-field").classList.replace("hidden","flex")
        return 0
    }
        
}
//to send data to backend
async function sendData(signin_email,signin_password){
    try {
        const response= await fetch(window.location.href,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:signin_email,
                password:signin_password,
            }),
            
        });
        if(response.ok){
            const data=await response.json()
            if(data.success){
                console.log("Login SUccessfull")
                window.location.href="/home"
            }
            else{
                document.getElementById("fill-all-field").innerText=data.message
                document.getElementById("fill-all-field").classList.replace("hidden","flex")
            }
        }
        else{
            document.getElementById("fill-all-field").innerText="Invalid Credentails"
            document.getElementById("fill-all-field").classList.replace("hidden","flex")
        }
        
    } catch (error) {
        window.alert("Some error occured. Please try after some time")
    }
}