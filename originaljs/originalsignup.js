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
    document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
    document.getElementById("fill-all-field").classList.replace("hidden","flex")
    // window.alert("Please enter the required fields");
    return;
  }
  if (signup_name.length < 5) {
    document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
    document.getElementById("fill-all-field").classList.replace("hidden","flex")
    document.getElementById("fill-all-field").innerText="Name is too short!"
    // window.alert("Name is too short!");
    document.getElementById("fullname").value = "";
    return;
  }
  if (!email_checker(signup_email)) {
    return;
  }
  if (!password_checker()) {
    return;
  }
  if (validate_number()) {
    return;
  }
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
  // window.alert("Please enter the correct values!")
}

// function to check email is of valid type
function email_checker(email) {
  try {
    temp = email.split("@");
    if (temp[1] == "cuchd.in" && temp.length === 2) {
      return 1;
    } else {
      document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
      document.getElementById("fill-all-field").classList.replace("hidden","flex")
      document.getElementById("fill-all-field").innerText="Please enter the valid cuchd email!"
      // window.alert("Please enter the valid cuchd email!");
      return 0;
    }
  } catch (error) {
    document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
    document.getElementById("fill-all-field").classList.replace("hidden","flex")
    document.getElementById("fill-all-field").innerText="Invalid Email format!"
    // window.alert("Invalid Email format!");
    return 0;
  }
}
// function to check both password match
function password_checker() {
  if (signup_password === signup_password_confirm) {
    return 1;
  } else {
    document.getElementById("mobileNumber").parentNode.classList.replace("mb-6","mb-2")
    document.getElementById("fill-all-field").classList.replace("hidden","flex")
    document.getElementById("fill-all-field").innerText="password fields dont match"
    // window.alert("Create password and confirm password field dont match");
    return 0;
  }
}
// function to check mobile number length is 10
function validate_number() {
  if (signup_mobileNumber.length == 10 && isNaN(signup_mobileNumber)) {
    return 1;
  } else {
    return 0;
  }
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
        // console.log("data sent successfully");
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
