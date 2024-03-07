// Selecting DOM elements
const timeContainer = document.querySelector(".current__container");
const currentTime = document.querySelector(".time");
const amOrPm = document.querySelector(".am__pm");

const selectMenu = document.querySelectorAll("select");
const setAlarmButton = document.querySelector("button");
const alarmsDisplay = document.getElementById("alarms");
const ampmCheckbox = document.getElementById("ampmCheckbox");

const body = document.body;

// Array to store alarm objects
let alarms = [];

// Function to update clock display and manage alarms
function updateClock() {
    // Get current date and time
    let date = new Date();

    // Extract hour, minute, and seconds
    let hour = String(date.getHours() % 12 || 12).padStart(2, "0"); // Get hours in 12-hour format
    let minute = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading zero if needed
    let seconds = String(date.getSeconds()).padStart(2, "0"); // Pad seconds with leading zero if needed

    // Determine whether it's AM or PM
    let timeOfDay = date.getHours() >= 12 ? "PM" : "AM"; // Determine AM or PM

    // Update current time display
    currentTime.innerText = `${hour}:${minute}:${seconds} `;

    // Update AM/PM display based on checkbox state
    amOrPm.innerText = `${ampmCheckbox.checked ? timeOfDay : ""}`;

    // Change background color based on daytime or nighttime
    if (date.getHours() >= 7 && date.getHours() < 19) {
        // Daytime
        body.style.backgroundColor = "#f0f0f0"; // Light color
    } else {
        // Nighttime
        body.style.backgroundColor = "#222";
        body.style.color = "#fff"; // Dark color
    }

    // Function to calculate time difference between current time and alarm time
    const calculateTimeDifference = (alarm) => {
        // Extract hour, minute, and time of day of the alarm
        const selectedHour = alarm.hour;
        const selectedMinute = alarm.minute;
        const selectedTimeOfDay = alarm.timeOfDay;

        // Convert selected time to total minutes
        let selectedTotalMinutes = (selectedHour % 12) * 60 + selectedMinute; // Convert selected time to total minutes

        // Convert current time to total minutes
        let currentTotalMinutes =
            (date.getHours() % 12) * 60 + date.getMinutes(); // Convert current time to total minutes

        // Adjust selected time and current time based on AM/PM
        if (selectedTimeOfDay === "PM" && timeOfDay === "AM") {
            selectedTotalMinutes += 12 * 60; // Add 12 hours if the selected time is PM and the current time is AM
        } else if (selectedTimeOfDay === "AM" && timeOfDay === "PM") {
            currentTotalMinutes += 12 * 60; // Add 12 hours if the current time is PM and the selected time is AM
        }

        // Calculate time difference
        let timeDifference = selectedTotalMinutes - currentTotalMinutes;

        if (timeDifference < 0) {
            // If the time difference is negative, it means the alarm time is in the past, so add 12 hours (720 minutes)
            timeDifference += 12 * 60;
        }

        return timeDifference;
    };

    // Sort alarms based on time difference
    alarms.sort((a, b) => {
        const timeDifferenceA = calculateTimeDifference(a);
        const timeDifferenceB = calculateTimeDifference(b);
        return timeDifferenceA - timeDifferenceB;
    });

    // Loop through alarms to check if any alarm is triggered
    alarms.forEach((alarm, index) => {
        const selectedTimeOfDay = alarm.timeOfDay;

        // Based on the timeDifference if it remains 10 minutes before
        // the alarm goes off
        if (index === 0) {
            timeDifference = calculateTimeDifference(alarm);

            if (timeDifference > 0 && timeDifference <= 10) {
                // Within 10 minutes before alarm
                timeContainer.style.backgroundColor = "#ff0000";
                timeContainer.style.color = "#fff";
                timeContainer.style.padding = "0 20px";
                timeContainer.style.margin = " 0 0 20px 0"; // Attention-grabbing color
            } else {
                timeContainer.style.backgroundColor = "";
                timeContainer.style.color = "";
            }
        }

        if (
            alarm.time === `${hour}:${minute} ${timeOfDay}` &&
            timeOfDay === selectedTimeOfDay
        ) {
            // Trigger the alarm
            alert(`${alarm.time} alarm triggered!`);

            // Remove the triggered alarm from the array
            alarms.splice(index, 1);

            // Update the displayed alarms
            displayAlarms();
        }
    });
}

// Call the function immediately to avoid initial delay
updateClock();
// Update clock every second
setInterval(updateClock, 1000);

// Populate hour select menu options
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populate minute select menu options
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Populate AM/PM select menu options
["PM", "AM"].forEach((timeOfDay) => {
    let option = `<option value="${timeOfDay}">${timeOfDay}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
});

// Function to set an alarm
const setAlarm = () => {
    // Parse the selected hour string to a number
    const hour = parseInt(selectMenu[0].value);

    // Parse the selected minute string to a number
    const minute = parseInt(selectMenu[1].value);

    // Pad the selected hour with a 0 if its a single number leave it
    // untouched if it is a double number
    const paddedHour =
        parseInt(selectMenu[0].value) < 10
            ? "0" + parseInt(selectMenu[0].value)
            : selectMenu[0].value;

    // Pad the selected minute with a 0 if its a single number leave it
    // untouched if it is a double number
    const paddedMinute =
        parseInt(selectMenu[1].value) < 10
            ? "0" + parseInt(selectMenu[1].value)
            : selectMenu[1].value;

    const timeOfDay = selectMenu[2].value;

    // Check if valid time is selected
    if (hour === "Hour" || minute === "Minute" || timeOfDay === "AM/PM") {
        return alert("Please, select a valid time to set Alarm!");
    }

    // Add the alarm to the alarms array
    alarms.push({
        hour,
        minute,
        timeOfDay,
        time: `${paddedHour}:${paddedMinute} ${timeOfDay}`,
    });

    // Update the displayed alarms
    displayAlarms();
};

// Event listener for setting alarm
setAlarmButton.addEventListener("click", () => {
    setAlarm();
});

// Function to display alarms in the UI
function displayAlarms() {
    // Clear the current content
    alarmsDisplay.innerHTML = "";
    alarms.forEach((alarm, index) => {
        let alarmElement = document.createElement("div");
        alarmElement.textContent = `Alarm ${index + 1}: ${alarm.time}`;
        alarmsDisplay.appendChild(alarmElement);
    });
}
