
# Alarm Clock 

## Description

A JavaScript application for setting alarms based on user-defined times and displaying them. It updates the UI to indicate when an alarm is about to trigger and allows users to set alarms for specific times of the day. It also displays an attention-grabbing color before the alarm goes off. Additionally, it changes color based on the time of day.


## Installation

1. Clone the repository:

   ```bash
     git clone https://github.com/olafisoyevince/alarm-clock.git
   

2. Navigate to the project directory:

```bash
cd alarm-clock
```

3. Open the `index.html` file in your web browser.

## Usage

1. Open the `index.html` file in your web browser.
2. Select the hour, minute, and AM/PM for your alarm using the dropdown menus.
3. Click the "Set Alarm" button to set the alarm.
4. The alarms will be displayed below the input fields.
5. When an alarm triggers, an alert will be shown.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alarm Clock</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="current__container">
    <span class="time"></span>
    <span class="am__pm"></span>
  </div>

  <div class="form__container">
    <select>
      <option value="Hour">Hour</option>
    </select>
    <select>
      <option value="Minute">Minute</option>
    </select>
    <select>
      <option value="AM/PM">AM/PM</option>
    </select>
    <button>Set Alarm</button>
  </div>

  <div id="alarms"></div>

  <script src="script.js"></script>
</body>
</html>
```

## Credits

- Created by [Oluwaseun Olafisoye](https://github.com/olafisoye-vince)

```
