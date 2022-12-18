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
                    if (taskTimer.timer.timeoutId == null) {
                        console.log(`The timer for "${taskTimer.task}" is complete.`);
                        //Stop timer display
                        taskTimer.timer.stop();
                        this.alert(taskTimer.timer)
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

    alert(timer) {
        // Get the child element
        var child = document.getElementById(timer.spanId + 'p');
        console.log(timer.spanId)
        // Get the parent of the child element
        var existing = child.parentElement;

        // Add the animation to the element
        existing.style.animation = 'flash 1s infinite';
        child.style.animation = 'flash2 1s infinite';
        // Start the animation
        existing.style.animationPlayState = 'running';
        child.style.animationPlayState = 'running';

        // // Stop the animation after 5 seconds
        // setTimeout(function () {
        //     existing.style.animationPlayState = 'paused';
        // }, 5000);

    }

    stop() {
        clearInterval(this.intervalId)
        this.active = false
        console.log("Timer manager has been stopped")
    }
}




