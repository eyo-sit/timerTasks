class Timer {
    constructor(startTime, endTime, spanId) {
        this.startTime = startTime
        this.endTime = endTime
        this.spanId = spanId
        this.timeoutId = null
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
        const timerDisplay = document.getElementById(this.spanId)
        timerDisplay.textContent = timeRemainingString

        //Sets timeoutId to false once timer has expired
        this.timeoutId = setTimeout(() => {
            console.log(`Timer has expired.`);
            this.timeoutId = null;
            // Perform other tasks here, such as playing a sound or showing a notification.
        }, this.endTime - new Date());

        // Update the timer display every second
        this.intervalId = setInterval(() => {
            // Calculate the new time remaining
            timeRemaining = this.endTime - new Date()
            //Format time remaining into desired string length
            let timeRemainingString = this.formatTimeRemaining(timeRemaining);
            // Display the time remaining in the desired format
            console.log(timeRemainingString.length)
            if (timeRemainingString.length == 0) {
                console.log(timeRemainingString)
                const timerDisplay = document.getElementById(this.spanId + 'p')
                timerDisplay.textContent = 'Timer expired'
                console.log(`Timer has expired.`);
            } else if (this.timeoutId != null) {
                console.log(timeRemainingString)
                const timerDisplay = document.getElementById(this.spanId)
                timerDisplay.textContent = timeRemainingString
            }

        }, 1000)
    }

    //Stop timer display from updating
    stop() {
        clearInterval(this.intervalId);
        const timerDisplay = document.getElementById(this.spanId + 'p')
        timerDisplay.textContent = 'Timer expired'
    }
}
