const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmButton = document.querySelector("button");
const alarmsDisplay = document.getElementById("alarms");
const ampmCheckbox = document.getElementById("ampmCheckbox");
const body = document.body;

let alarms = [];

function updateClock() {
    let date = new Date();
    let hour = String(date.getHours() % 12 || 12).padStart(2, "0"); // Get hours in 12-hour format
    let minute = String(date.getMinutes()).padStart(2, "0"); // Pad minutes with leading zero if needed
    let seconds = String(date.getSeconds()).padStart(2, "0"); // Pad seconds with leading zero if needed
    let timeOfDay = date.getHours() >= 12 ? "PM" : "AM"; // Determine AM or PM
    currentTime.innerText = `${hour}:${minute}:${seconds} ${
        ampmCheckbox.checked ? timeOfDay : ""
    }`;

    if (date.getHours() >= 7 && date.getHours() < 19) {
        // Daytime
        body.style.backgroundColor = "#f0f0f0"; // Light color
    } else {
        // Nighttime
        body.style.backgroundColor = "#222";
        body.style.color = "#fff"; // Dark color
    }

    const calculateTimeDifference = (alarm) => {
        const selectedHour = alarm.hour;
        const selectedMinute = alarm.minute;
        const selectedTimeOfDay = alarm.timeOfDay;

        let selectedTotalMinutes = (selectedHour % 12) * 60 + selectedMinute; // Convert selected time to total minutes
        let currentTotalMinutes =
            (date.getHours() % 12) * 60 + date.getMinutes(); // Convert current time to total minutes

        if (selectedTimeOfDay === "PM" && timeOfDay === "AM") {
            selectedTotalMinutes += 12 * 60; // Add 12 hours if the selected time is PM and the current time is AM
        } else if (selectedTimeOfDay === "AM" && timeOfDay === "PM") {
            currentTotalMinutes += 12 * 60; // Add 12 hours if the current time is PM and the selected time is AM
        }

        let timeDifference = selectedTotalMinutes - currentTotalMinutes;

        if (timeDifference < 0) {
            // If the time difference is negative, it means the alarm time is in the past, so add 12 hours (720 minutes)
            timeDifference += 12 * 60;
        }

        return timeDifference;
    };

    alarms.sort((a, b) => {
        const timeDifferenceA = calculateTimeDifference(a);
        const timeDifferenceB = calculateTimeDifference(b);
        return timeDifferenceA - timeDifferenceB;
    });

    alarms.forEach((alarm, index) => {
        const selectedHour = alarm.hour;
        const selectedMinute = alarm.minute;
        const selectedTimeOfDay = alarm.timeOfDay;

        if (index === 0) {
            timeDifference = calculateTimeDifference(alarm);

            if (timeDifference > 0 && timeDifference <= 1) {
                // Within 10 minutes before alarm
                currentTime.style.backgroundColor = "#ff0000";
                currentTime.style.color = "#fff";
                currentTime.style.padding = "0 20px"; // Attention-grabbing color
            } else {
                currentTime.style.backgroundColor = "";
                currentTime.style.color = "";
            }
        }

        console.log(timeDifference);

        if (
            alarm.time === `${hour}:${minute} ${timeOfDay}` &&
            timeOfDay === selectedTimeOfDay
        ) {
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

for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

["PM", "AM"].forEach((timeOfDay) => {
    let option = `<option value="${timeOfDay}">${timeOfDay}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
});

const setAlarm = () => {
    const hour = parseInt(selectMenu[0].value);

    const minute = parseInt(selectMenu[1].value);

    const paddedHour =
        parseInt(selectMenu[0].value) < 10
            ? "0" + parseInt(selectMenu[0].value)
            : selectMenu[0].value;
    const paddedMinute =
        parseInt(selectMenu[1].value) < 10
            ? "0" + parseInt(selectMenu[1].value)
            : selectMenu[1].value;

    const timeOfDay = selectMenu[2].value;

    if (hour === "Hour" || minute === "Minute" || timeOfDay === "AM/PM") {
        return alert("Please, select a valid time to set Alarm!");
    }

    alarms.push({
        hour,
        minute,
        timeOfDay,
        time: `${paddedHour}:${paddedMinute} ${timeOfDay}`,
    });
    // Update the displayed alarms
    displayAlarms();
    // console.log(alarmTime);
};

setAlarmButton.addEventListener("click", () => {
    setAlarm();
});

function displayAlarms() {
    alarmsDisplay.innerHTML = ""; // Clear the current content
    alarms.forEach((alarm, index) => {
        let alarmElement = document.createElement("div");
        alarmElement.textContent = `Alarm ${index + 1}: ${alarm.time}`;
        alarmsDisplay.appendChild(alarmElement);
    });
}
