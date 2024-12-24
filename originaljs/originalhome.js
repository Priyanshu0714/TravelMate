// navigation bar scroll to sections for about and features
document.getElementById("features").addEventListener("click", () => {
    document.getElementById("part2").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("about").addEventListener("click", () => {
    document.getElementById("part3").scrollIntoView({ behavior: "smooth" });
  });
  // document.getElementById("login").addEventListener("click",()=>{
  //     document.getElementById("login-details").classList.replace("right-[-200px]","right-0")
  // })
  
  document.getElementById("logout").addEventListener("click", () => {
    window.location.href = "/";
  });
  
  //capitalize function
  function capitalize(newstr) {
    newstr = newstr.trim();
  
    if (newstr.split(" ").length > 1) {
      newstr = newstr
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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
    // get the date from ui
    departure = capitalize(document.getElementById("Departure").value.trim().toLowerCase());
    destination = capitalize(document.getElementById("Destination").value.trim().toLowerCase());
    date = document.getElementById("Date").value.trim();
    console.log(departure,destination)
    if (!departure || !destination || !date) {
      document.getElementById("search-details-req").classList.remove("hidden");
    }
    if (!check_date(date)) {
      if (
        document.getElementById("search-details-req").classList.contains("hidden")
      ) {
        document.getElementById("search-details-req").classList.remove("hidden");
      }
      document.getElementById("search-details-req").innerText =
        "Select a valid date";
      return;
    }
  
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
      if (respose.ok) {
        const data = await respose.json();
        if (!data.message) {
          document.getElementById("pop-up").classList.replace("hidden", "flex");
        } else {
          data.records.forEach((temp) => {
            document.getElementById(
              "create-matching-travellers"
            ).innerHTML += `<div  class="h-auto w-[400px] border border-gray-400 bg-gray-200 flex gap-5 flex-col rounded-lg p-5">
          <div class="font-bold text-lg">${temp.name}</div>
          <div>
            <div class="testing-from">Departure : ${temp.departure}</div>
            <div class="testing-to">Destination : ${temp.destination}</div>
            <div class="testing-date">Date : ${temp.date}</div>
            <div>Gender : ${temp.gender}</div>
            <div>Preferred Gender : ${temp.gender_preference}</div>
            <div>Communication Details : ${temp.communication_preferences}</div>
          </div>
          <button class="testing-connect w-full h-[40px] bg-black text-white rounded-lg">Connect</button>
        </div>`;
          });
          document
            .getElementById("part-hidden")
            .classList.replace("hidden", "flex");
        }
      } else {
        console.log("response.ok error received");
      }
    } catch (error) {
      console.log("try-catch error occured");
    }
  });
  
  // function to check the date is a valid date and not a date form past
  function check_date(date) {
    const d = new Date();
    const current_date = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
    const user_input = date.split("-").reverse();
    const temp = user_input.map((x) => parseInt(x));
    //  0 is for date, 1 is for month and 2 is for year
    if (
      temp[0] >= current_date[0] &&
      temp[1] >= current_date[1] &&
      temp[2] >= current_date[2]
    ) {
      return 1;
    } else {
      return 0;
    }
  }
  
  // main popup close
  document.getElementById("pop-up-close").addEventListener("click", () => {
    document.getElementById("pop-up").classList.replace("flex", "hidden");
  });
  
  // for travel right arrow open and close
  const data_attribute = document.querySelectorAll("[data-attribute]");
  
  data_attribute.forEach((element) => {
    const number = element.getAttribute("data-attribute");
    const right_arrow = element.querySelector(`#right-arrow${number}`);
    const close_button = element.querySelector(`#close-button${number}`);
    const temp_button=element.querySelector(`#temp${number}`)
    const current_divs = element.querySelectorAll("div");
  
  temp_button.addEventListener("click",()=>{
    current_divs.forEach((each_div) => {
      if (each_div.classList.contains("hidden" && "req")) {
        each_div.classList.replace("hidden", "flex");
      }
    });
    right_arrow.classList.replace("flex", "hidden");
    close_button.classList.replace("hidden", "flex");
  })
  
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
    basic_detail_name=capitalize(document.getElementById("basic-details-name").value.trim());
    basic_detail_age = capitalize(document.getElementById("basic-details-age").value.trim());
    basic_detail_gender = capitalize(document.getElementById("basic-details-gender").value.trim());
    travel_detail_departure = capitalize(document.getElementById("travel-details-departure").value.trim());
    travel_detail_destination = capitalize(document.getElementById("travel-details-destination").value.trim());
    travel_detail_date = document.getElementById("travel-details-date").value.trim();
    interest_gender = capitalize(document.getElementById("gender-preferences").value.trim());
    communication_preferences = capitalize(document.getElementById("communication-details").value.trim());
  
    if (
      !basic_detail_name||
      !basic_detail_age ||
      !basic_detail_gender ||
      !travel_detail_departure ||
      !travel_detail_destination ||
      !travel_detail_date ||
      !interest_gender ||
      !communication_preferences
    ) {
      document
        .getElementById("fill-the-above-field")
        .classList.replace("hidden", "flex");
      return;
    }
    // console.log(basic_detail_age,basic_detail_gender,travel_detail_departure,travel_detail_destination,travel_detail_date,interest_gender,communication_preferences)
    try {
      const response = await fetch("/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "popup",
          name:basic_detail_name,
          age: basic_detail_age,
          gender: basic_detail_gender,
          departure: travel_detail_departure,
          destination: travel_detail_destination,
          date: travel_detail_date,
          gender_preference: interest_gender,
          communication_preferences: communication_preferences,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("done succesfully");
          // for done animation
          setTimeout(()=>{
            document.getElementById("pop-up-details").classList.add("hidden")
            document.getElementById("pop-up-animation").classList.remove("hidden")
          },0)
          setTimeout(()=>{
            document.getElementById("pop-up").classList.add("hidden")
          },3000)
        } else {
          console.log("some error occured");
        }
      } else {
        console.log("response.ok error occured");
      }
    } catch (error) {
      console.log("Please try after sometime");
    }
  });
  
  