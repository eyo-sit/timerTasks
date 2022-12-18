class Timer {
    constructor(spanId, timeRemaining) {
        this.timeRemaining = timeRemaining
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

        if (seconds > 1) {
            timeRemainingString += `${seconds} seconds`;
        } else if (seconds == 1) {
            timeRemainingString += `${seconds} second`;
        }

        return timeRemainingString;
    }

    start() {
        // Calculate the time remaining until the end time
        console.log(this.timeRemaining)

        let currentTime = new Date()

        this.endTime = new Date(currentTime.getTime() + this.timeRemaining)

        let timeRemainingString

        const timerDisplay = document.getElementById(this.spanId)

        const timerDisplayP = document.getElementById(this.spanId + 'p')


        // Update the timer display every second
        this.intervalId = setInterval(() => {
            //Subtract a second from the timeRemaining
            this.timeRemaining -= 1000

            //Format time remaining into desired string length
            timeRemainingString = this.formatTimeRemaining(this.timeRemaining);

            if (timeRemainingString.length == 0 || this.timeoutId == null) {

                //Update the p element
                timerDisplayP.textContent = 'Timer expired'

                console.log(`Timer has expired.`);

                this.timeoutId == null
            } else if (timeRemainingString.length != 0 || this.timeoutId != null) {

                //Update the span element
                //Display the time remaining in the desired format
                timerDisplay.textContent = timeRemainingString
            }

        }, 1000)

        //Sets timeoutId to false once timer has expired
        this.timeoutId = setTimeout(() => {
            console.log(`Timer has expired.`);
            this.timeoutId = null;
            // Perform other tasks here, such as playing a sound or showing a notification.
        }, this.endTime - new Date());
    }

    //Stop timer display from updating
    stop() {
        clearInterval(this.intervalId);
        const timerDisplay = document.getElementById(this.spanId + 'p')
        clearTimeout(this.timeoutId)
        this.timeoutId = null
    }

    pause() {

    }
}
