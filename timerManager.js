

class timerManager {
    constructor() {
        this.tasks = []
        this.active = false
        // Create two arrays to store active and completed timers.
        this.activeTimers = [];
        this.completedTimers = [];
    }

    start() {
        console.log("Timer was started and set to active")
        this.active = true
        // Use setInterval to check for completed timers every second.
        this.intervalId = setInterval(() => {
            console.log("Timer is checking for active timers...")
            if (this.activeTimers.length != 0) {
                // Loop through the active timers and check if the timeout
                // has been cleared. If it has, the timer is complete. Stop
                // the timer and add it to the completedTimers array.
                for (const taskTimer of this.activeTimers) {
                    if (taskTimer.timer.status == 2) {
                        console.log(`The timer for "${taskTimer.task}" is complete.`);
                        //Stop timer display
                        taskTimer.timer.stop();
                        this.alert(taskTimer)
                        this.activeTimers = this.activeTimers.filter(t => t !== taskTimer);
                        this.completedTimers.push(taskTimer);
                    } else {
                        console.log(`The timer for ${taskTimer.task} is ongoing.`);
                    }
                }
            } else {
                console.log("No actvie timers remaining")
                this.stop()
            }
        }, 1000);
    }

    alert(taskTimer) {
        // Get the child element
        var child = document.getElementById(taskTimer.timer.spanId + 'p');
        console.log(taskTimer.timer.spanId)
        // Get the parent of the child element
        var existing = child.parentElement;

        // Add the animation to the element
        existing.style.animation = 'flash 1s infinite';
        child.style.animation = 'flash2 1s infinite';
        // Start the animation
        existing.style.animationPlayState = 'running';
        child.style.animationPlayState = 'running';

        const NOTIFICATION_TITLE = taskTimer.task
        const NOTIFICATION_BODY = 'Timer for ' + taskTimer.task + ' has completed. Click to see more.'
        const CLICK_MESSAGE = 'Notification clicked!'

        new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }, { silent: true })
            .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE
        const alertNoise = new Audio('simple.mp3')
        alertNoise.play()

        //Get spanIdp and get the parent and get the pause button element and remove it
        let pauseButton = document.getElementById(taskTimer.timer.spanId + 'pause')
        pauseButton.parentNode.removeChild(pauseButton)
    }

    stop() {
        clearInterval(this.intervalId)
        this.active = false
        console.log("Timer manager has been stopped")
    }
}




