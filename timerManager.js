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
                    console.log(`taskTimer.timer.timeoutId = ${taskTimer.timer.timeoutId}`)
                    if (taskTimer.timer.timeoutId == null) {
                        console.log(`The timer for "${taskTimer.task}" is complete.`);
                        //Stop timer display
                        taskTimer.timer.stop();
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

    stop() {
        clearInterval(this.intervalId)
        this.active = false
        console.log("Timer manager has been stopped")
    }
}




