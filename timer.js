class Timer {
    constructor(startTime, endTime) {
        this.startTime = startTime
        this.endTime = endTime
    }

    formatTimeRemaining(timeRemaining) {
        // Create a new Date object
        const date = new Date(timeRemaining);

        // Use the Date object methods to get the number of days, hours, minutes, and seconds
        const days = date.getUTCDate() - 1;
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        let timeRemainingString = '';

        if (days > 1) {
            timeRemainingString += `${days} days `;
        } else if (days == 1) {
            timeRemainingString += `${days} day `;
        }

        if (hours > 1) {
            timeRemainingString += `${hours} hours `;
        } else if (hours == 1) {
            timeRemainingString += `${hours} hour `;
        }

        if (minutes > 1) {
            timeRemainingString += `${minutes} minutes `;
        } else if (minutes == 1) {
            timeRemainingString += `${minutes} minute `;
        }

        if (seconds >= 1) {
            timeRemainingString += `${seconds} seconds`;
        } else if (seconds == 1) {
            timeRemainingString += `${seconds} second`;
        }

        return timeRemainingString;
    }

    start() {
        // Calculate the time remaining until the end time
        let timeRemaining = this.endTime - this.startTime
        let timeRemainingString = this.formatTimeRemaining(timeRemaining);

        // Display the time remaining in the UI
        const timerDisplay = document.getElementById('timer-display')
        timerDisplay.textContent = timeRemainingString

        // Update the timer display every second
        setInterval(() => {
            // Calculate the new time remaining
            timeRemaining = this.endTime - new Date()
            //Format time remaining into desired string length
            let timeRemainingString = this.formatTimeRemaining(timeRemaining);

            // Display the time remaining in the desired format
            const timerDisplay = document.getElementById('timer-display')
            timerDisplay.textContent = timeRemainingString
        }, 1000)
    }
}