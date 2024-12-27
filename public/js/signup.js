// to get data from sign up page
let signup_name = null;
let signup_email = null;
let signup_password = null;
let signup_password_confirm = null;
let signup_mobileNumber = null;
document.getElementById("signup_button").addEventListener("click", () => {
  signup_name = document.getElementById("fullname").value.trim();
  signup_email = document
    .getElementById("signup_email")
    .value.trim()
    .toLowerCase();
  signup_password = document.getElementById("create-password").value.trim();
  signup_mobileNumber = document.getElementById("mobileNumber").value.trim();
  signup_password_confirm = document
    .getElementById("confirm-password")
    .value.trim();
  if (
    !signup_email ||
    !signup_mobileNumber ||
    !signup_name ||
    !signup_password ||
    !signup_password_confirm
  ) {
    change_placeholder();
    fieldVisible()
    return;
  }
  console.log("yes1")
  if (signup_name.length < 5) {
    fieldVisible("Name is too short!")
    document.getElementById("fullname").value = "";
    return;
  }
  console.log('yes2')
  if (!email_checker(signup_email)) {
    return;
  }
  console.log("yes3")
  if (!password_checker()) {
    return;
  }
  console.log("yes4")
  if (validate_number()) {
    return;
  }
  console.log("yes5")
  senddata(signup_name,signup_email,signup_password,signup_mobileNumber);
});
// function to change the place holder
function change_placeholder() {
  document.getElementById("fullname").placeholder = "required!";
  document.getElementById("fullname").classList.add("placeholder-red-400");
  document.getElementById("signup_email").placeholder = "required!";
  document.getElementById("signup_email").classList.add("placeholder-red-400");
  document.getElementById("mobileNumber").placeholder = "required!";
  document.getElementById("mobileNumber").classList.add("placeholder-red-400");
  document.getElementById("create-password").placeholder = "required!";
  document
    .getElementById("create-password")
    .classList.add("placeholder-red-400");
}

// function to check email is of valid type
function email_checker(email) {
  try {
    temp = email.split("@");
    if (temp[1] == "cuchd.in" && temp.length === 2) {
      return 1;
    } else {
      fieldVisible("Please enter the valid cuchd email!")
      return 0;
    }
  } catch (error) {
    fieldVisible("Invalid Email format!")
    return 0;
  }
}
// function to check both password match
function password_checker() {
  if (signup_password === signup_password_confirm) {
    return 1;
  } else {
    fieldVisible("password fields dont match")
    return 0;
  }
}
// function to check mobile number length is 10
function validate_number() {
    if (signup_mobileNumber.length != 10 || isNaN(signup_mobileNumber)) {
        fieldVisible("Invalid mobile number!")
        return 1;
      }
      return 0;    
}
// function to send data to backend
async function senddata(
  signup_name,
  signup_email,
  signup_password,
  signup_mobileNumber
) {
  try {
    const response = await fetch('/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signup_email,
        name: signup_name,
        password: signup_password,
        number: signup_mobileNumber,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log("data sent successfully");
        window.location.href = "/";
      } else {
        window.alert(data.message)
      }
    }
    else{
      window.alert("Some error occured please try after some time")
    }
  } catch (error) { 
    window.alert("Some error occured please try again after some time")
  }
}

// function to make fill-all-field visible
function fieldVisible(message=""){
    document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
    document.getElementById("fill-all-field").classList.replace("hidden","flex")
    document.getElementById("fill-all-field").innerText = message;
}
