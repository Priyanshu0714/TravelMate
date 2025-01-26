// navigation bar scroll to sections for about and features
document.getElementById("features").addEventListener("click", () => {
  document.getElementById("part2").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("about").addEventListener("click", () => {
  document.getElementById("part3").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("logout").addEventListener("click", async () => {
  try {
    const response = await fetch("/logout", {
      method: "GET",
      credentials: "same-origin",
    });

    if (response.redirected) {
      window.location.href = response.url;
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

//capitalize function
function capitalize(newstr) {
  newstr = newstr.trim();

  if (newstr.split(" ").length > 1) {
    newstr = newstr
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return newstr;
  } else {
    return newstr.charAt(0).toUpperCase() + newstr.slice(1).toLowerCase();
  }
}

let departure = null;
let destination = null;
let date = null;
document.getElementById("part1-button").addEventListener("click", () => {
  document.getElementById("part1").classList.remove("h-[70vh]");
  document.getElementById("part1").classList.add("h-[90vh]");
  document.getElementById("part1-button").classList.add("hidden");
  document.getElementById("part1-button").classList.remove("flex");
  document.getElementById("button-click-hidden").classList.add("flex");
  document.getElementById("button-click-hidden").classList.remove("hidden");
});

document.getElementById("search-button").addEventListener("click", async () => {
  // to make sure pop-up-animation is disabled
  const searchButton = document.getElementById("search-button");
  searchButton.disabled = true;
  if (
    !document.getElementById("pop-up-animation").classList.contains("hidden")
  ) {
    document.getElementById("pop-up-animation").classList.add("hidden");
  }
  // get the date from ui
  departure = capitalize(
    document.getElementById("Departure").value.trim().toLowerCase()
  );
  destination = capitalize(
    document.getElementById("Destination").value.trim().toLowerCase()
  );
  date = document.getElementById("Date").value.trim();
  if (!departure || !destination || !date) {
    document.getElementById("search-details-req").classList.remove("hidden");
    document.getElementById("search-details-req").innerText =
      "Fill the above details";
    searchButton.disabled = false;
    return;
  }
  if (!check_date(date)) {
    if (
      document.getElementById("search-details-req").classList.contains("hidden")
    ) {
      document.getElementById("search-details-req").classList.remove("hidden");
    }
    document.getElementById("search-details-req").innerText =
      "Select a date within 3 months";
    searchButton.disabled = false;
    return;
  }
  if (
    !document.getElementById("search-details-req").classList.contains("hidden")
  ) {
    document.getElementById("search-details-req").classList.add("hidden");
  }
  // for building animation
  document.getElementById("part-hidden").classList.replace("hidden", "flex");
  document.getElementById("part-hidden").scrollIntoView({ behavior: "smooth" });
  document
    .getElementById("create-matching-travellers-skeleton")
    .classList.replace("hidden", "flex");
  // for sending data to backend
  try {
    const respose = await fetch("/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "search-box",
        departure: departure,
        destination: destination,
        date: date,
      }),
    });
    searchButton.disabled = false;
    if (respose.status === 200) {
      const data = await respose.json();
      if (!data.message) {
        document.getElementById("pop-up").classList.replace("hidden", "flex");
        document.getElementById("Departure").value = "";
        document.getElementById("Destination").value = "";
        document.getElementById("Date").value = "";
        return;
      }
      // else {
      else {
        if (data.message) {
          if (data.type === "usermatched") {
            // Display normal user matches
            document.getElementById("matching-travellers-name").innerHTML =
              "Matching Travellers";
            wrap_matching_traveller(data);
          } else if (data.type === "AImatched") {
            // Display AI-recommended matches
            wrap_matching_traveller(data);
            document.getElementById("matching-travellers-name").innerHTML =
              "Recommendation based on AI";
          }
        } else {
          console.log("No matches found");
        }
      }
    } else {
      console.log("response.ok error received");
      return;
    }
  } catch (error) {
    console.log("try-catch error occured");
    return;
  }
});

// function to check the date is a valid date and not a date form past
function check_date(date) {
  const d = new Date();
  const current_date = d.toISOString().split("T")[0];
  // for future month
  d.setMonth(d.getMonth() + 3);
  const future_date = d.toISOString().split("T")[0];
  if (date >= current_date && date <= future_date) {
    return 1;
  } else {
    return 0;
  }
}

// // main popup close
document.getElementById("pop-up-close").addEventListener("click", () => {
  document.getElementById("pop-up").classList.replace("flex", "hidden");
  if (document.getElementById("part-hidden").classList.contains("flex")) {
    document.getElementById("part-hidden").classList.replace("flex", "hidden");
  }
});

// for travel right arrow open and close
const data_attribute = document.querySelectorAll("[data-attribute]");

data_attribute.forEach((element) => {
  const number = element.getAttribute("data-attribute");
  const right_arrow = element.querySelector(`#right-arrow${number}`);
  const close_button = element.querySelector(`#close-button${number}`);
  const temp_button = element.querySelector(`#temp${number}`);
  const current_divs = element.querySelectorAll("div");

  temp_button.addEventListener("click", () => {
    current_divs.forEach((each_div) => {
      if (each_div.classList.contains("hidden" && "req")) {
        each_div.classList.replace("hidden", "flex");
      }
    });
    right_arrow.classList.replace("flex", "hidden");
    close_button.classList.replace("hidden", "flex");
  });

  right_arrow.addEventListener("click", () => {
    current_divs.forEach((each_div) => {
      if (each_div.classList.contains("hidden" && "req")) {
        each_div.classList.replace("hidden", "flex");
      }
    });
    right_arrow.classList.replace("flex", "hidden");
    close_button.classList.replace("hidden", "flex");
  });

  close_button.addEventListener("click", () => {
    current_divs.forEach((each_div) => {
      if (each_div.classList.contains("flex" && "req")) {
        each_div.classList.replace("flex", "hidden");
      }
    });
    right_arrow.classList.replace("hidden", "flex");
    close_button.classList.replace("flex", "hidden");
  });
});

// to get data form popup
let basic_detail_name = null;
let basic_detail_age = null;
let basic_detail_gender = null;
let travel_detail_departure = null;
let travel_detail_destination = null;
let travel_detail_date = null;
let interest_gender = null;
let communication_preferences = null;

document.getElementById("pop-up-submit").addEventListener("click", async () => {
  basic_detail_name = capitalize(
    document.getElementById("basic-details-name").value.trim()
  );
  basic_detail_age = capitalize(
    document.getElementById("basic-details-age").value.trim()
  );
  basic_detail_gender = capitalize(
    document.getElementById("basic-details-gender").value.trim()
  );
  travel_detail_departure = capitalize(
    document.getElementById("travel-details-departure").value.trim()
  );
  travel_detail_destination = capitalize(
    document.getElementById("travel-details-destination").value.trim()
  );
  travel_detail_date = document
    .getElementById("travel-details-date")
    .value.trim();
  interest_gender = capitalize(
    document.getElementById("gender-preferences").value.trim()
  );
  travel_type = capitalize(
    document.getElementById("gender-preferences-traveltype").value.trim()
  );
  communication_preferences = capitalize(
    document.getElementById("communication-details").value.trim()
  );

  if (
    !basic_detail_name ||
    !basic_detail_age ||
    !basic_detail_gender ||
    !travel_detail_departure ||
    !travel_detail_destination ||
    !travel_detail_date ||
    !travel_type ||
    !interest_gender ||
    !communication_preferences
  ) {
    document
      .getElementById("fill-the-above-field")
      .classList.replace("hidden", "flex");
    return;
  }
  if (basic_detail_name.length < 3) {
    document
      .getElementById("fill-the-above-field")
      .classList.replace("hidden", "flex");
    document.getElementById("fill-the-above-field").innerText =
      "Name is too short!";
    return;
  }
  // to check basic detail age
  if (isNaN(basic_detail_age)) {
    document
      .getElementById("fill-the-above-field")
      .classList.replace("hidden", "flex");
    document.getElementById("fill-the-above-field").innerText =
      "Incorrect age type!";
    return;
  }
  if (!check_date(travel_detail_date)) {
    document
      .getElementById("fill-the-above-field")
      .classList.replace("hidden", "flex");
    document.getElementById("fill-the-above-field").innerText =
      "Select date within 3 months!";
    return;
  }
  // to fetch and send data
  try {
    const response = await fetch("/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "popup",
        name: basic_detail_name,
        age: basic_detail_age,
        gender: basic_detail_gender,
        departure: travel_detail_departure,
        destination: travel_detail_destination,
        date: travel_detail_date,
        travel_type: travel_type,
        gender_preference: interest_gender,
        communication_preferences: communication_preferences,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // for done animation
        setTimeout(() => {
          document.getElementById("pop-up-details").classList.add("hidden");
          document
            .getElementById("pop-up-animation")
            .classList.remove("hidden");
        }, 0);
        document.getElementById("pop-up-animation").classList.add("hidden");
        setTimeout(() => {
          document.getElementById("pop-up").classList.add("hidden");
        }, 3000);
        if (document.getElementById("part-hidden").classList.contains("flex")) {
          document
            .getElementById("part-hidden")
            .classList.replace("flex", "hidden");
        }
      } else {
        document.getElementById("pop-up-submit").innerText =
          "User already exists";
        document
          .getElementById("pop-up-submit")
          .classList.replace("bg-black", "bg-red-500");
        if (document.getElementById("part-hidden").classList.contains("flex")) {
          document
            .getElementById("part-hidden")
            .classList.replace("flex", "hidden");
        }
        return;
      }
    } else {
      console.log("response.ok error occured");
      return;
    }
  } catch (error) {
    console.log("Please try after sometime");
  }
});

// for chatbox
const chatBox = document.getElementById("chat-box");
const chattingButton = document.getElementById("chatting-button");
const chattingArea = document.getElementById("chatting-area");
const chatinput=document.getElementById("chat-input");
const chattingCloseButton = document.getElementById("chatting-area-close");
const chatForm=document.getElementById("chat-form");
chatBox.addEventListener("click", () => {
  chatBox.firstElementChild.classList.add("hidden");
  chatBox.lastElementChild.classList.replace("hidden", "flex");
  chatBox.classList.replace("rounded-full", "rounded-lg");
  // to delay the height and button animation
  setTimeout(() => {
    document.getElementById("chat-form").classList.add("w-full")
    chatBox.classList.replace("h-14", "h-96");
    chatBox.classList.replace("w-14", "w-80");
    chattingButton.classList.replace("w-0", "w-full");
    chattingButton.classList.remove("invisible");
    chattingArea.classList.replace("w-0", "w-full");
    chattingArea.classList.remove("invisible");
    chatinput.classList.replace("w-0", "w-full");
    chatinput.classList.remove("invisible");
  }, 200);
});

chattingCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  chatBox.classList.replace("h-96", "h-14");
  chatBox.classList.replace("w-80", "w-14");
  chattingButton.classList.replace("w-full", "w-0");
  chattingButton.classList.add("invisible");
  chattingArea.classList.replace("w-full", "w-0");
  chattingArea.classList.add("invisible");
  document.getElementById("chat-input").classList.replace("w-full", "w-0");
  document.getElementById("chat-input").classList.add("invisible");
  // to delay the height and button animation
  setTimeout(() => {
    chatBox.firstElementChild.classList.remove("hidden");
    chatBox.lastElementChild.classList.replace("flex", "hidden");
    chatBox.classList.replace("rounded-lg", "rounded-full");
  }, 100);
});

// to fetch the submit request of chatbox
chatForm.addEventListener("submit",async (e)=>{
  e.preventDefault();
  const message=chatinput.value.trim();
  if(!message){
    return;
  }
  const res=await fetch("/chatbox",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:message})
  })
  if(res.ok){
    chattingArea.innerHTML+=`<div class="float-right clear-both border border-blue-400 p-2 rounded-lg max-w-[45%] flex justify-end">${message}</div>`
    chatinput.value="";
  }
})

// function to wrap all things of matching traveller in one
function wrap_matching_traveller(data) {
  // for adding skeleton
  // document.getElementById("part-hidden").classList.replace("hidden", "flex");
  // document.getElementById("part-hidden").scrollIntoView({ behavior: "smooth" });
  // document.getElementById("create-matching-travellers-skeleton").classList.replace("hidden","flex")
  // for fetching records

  // clear all the previous records
  document.getElementById("create-matching-travellers").innerHTML = "";

  data.records.forEach((temp, index) => {
    document.getElementById(
      "create-matching-travellers"
    ).innerHTML += `<div  class="h-auto w-[400px] border border-gray-400 bg-gray-200 flex gap-5 flex-col rounded-lg p-4">
            <div class="name${index} font-bold text-lg">${temp.name}</div>
            <div>
              <div class="departure${index} testing-from">Departure : ${temp.departure}</div>
              <div class="destination${index} testing-to">Destination : ${temp.destination}</div>
              <div class="date${index} testing-date">Date : ${temp.date}</div>
              <div class="gender${index}">Gender : ${temp.gender}</div>
              <div class="preference${index}">Preferred Gender : ${temp.gender_preference}</div>
              <div class="traveltype${index}">Travel Type : ${temp.travel_type}</div>
              <div class="communication${index}">Communication Details : ${temp.communication_preferences}</div>
              <form action="/connect_button" method="post">
  <button name="connect_button" value="${temp.current_user_id}" id="matching-traveller-connect-${index}" class="w-full bg-black text-white border border-gray-400 h-9 outline-none rounded-lg mt-3">Connect</button>
</form>
            </div>
          </div>`;
  });
  // for removing the skeleton
  document
    .getElementById("create-matching-travellers-skeleton")
    .classList.replace("flex", "hidden");

  // // for testing connect button
  // const matchingTravellerButton = document.getElementById(
  //   "matching-traveller-connect"
  // );
  // data.records.forEach((temp, index) => {
  //   const button = document.getElementById(
  //     `matching-traveller-connect-${index}`
  //   );
  //   button.addEventListener("click", async () => {
  //     console.log("Connect button clicked for traveller:", temp.name);

  //     // Fetch matching traveller details dynamically
  //     const current_matching_traveller_name = document.querySelector(
  //       `.name${index}`
  //     ).textContent;
  //     const current_matching_traveller_departure = document
  //       .querySelector(`.departure${index}`)
  //       .textContent.split(": ")[1];
  //     const current_matching_traveller_destination = document
  //       .querySelector(`.destination${index}`)
  //       .textContent.split(": ")[1];
  //     const current_matching_traveller_date = document
  //       .querySelector(`.date${index}`)
  //       .textContent.split(": ")[1];
  //     const current_matching_traveller_gender = document
  //       .querySelector(`.gender${index}`)
  //       .textContent.split(": ")[1];
  //     const current_matching_traveller_preferences = document
  //       .querySelector(`.preference${index}`)
  //       .textContent.split(": ")[1];
  //     const current_matching_traveller_communication = document
  //       .querySelector(`.communication${index}`)
  //       .textContent.split(": ")[1];

  //     // Send a POST request
  //     const connect_button_response = await fetch("/home", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         type: "connect-button",
  //         name: current_matching_traveller_name,
  //         departure: current_matching_traveller_departure,
  //         destination: current_matching_traveller_destination,
  //         date: current_matching_traveller_date,
  //         gender: current_matching_traveller_gender,
  //         gender_preference: current_matching_traveller_preferences,
  //         communication_preferences: current_matching_traveller_communication,
  //       }),
  //     });

  //     if (connect_button_response.ok) {
  //       console.log("Successfully sent connection request.");
  //     } else {
  //       console.error("Failed to send connection request.");
  //     }
  //   });
  // });

  // for popup enable using
  document.getElementById("enable-pop-up").onclick = () => {
    if (
      !document.getElementById("pop-up-animation").classList.contains("hidden")
    ) {
      document.getElementById("pop-up-animation").classList.add("hidden");
    }
    document.getElementById("pop-up").classList.replace("hidden", "flex");
    return;
  };
  document.getElementById("Departure").value = "";
  document.getElementById("Destination").value = "";
  document.getElementById("Date").value = "";
  if (
    document.getElementById("search-details-req").classList.contains("flex")
  ) {
    document
      .getElementById("search-details-req")
      .classList.replace("flex", "hidden");
  }
}
