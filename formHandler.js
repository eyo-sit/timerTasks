// Get the input field
const input = document.getElementById('task-input')
const form = document.getElementById('task-form')

// Create an array to store the tasks and timers

const manager = new timerManager()
const tasks = manager.tasks

form.addEventListener('submit', e => {
    console.log('Form submitted')

    // Prevent the default behavior of the form submission
    e.preventDefault()

    // Get the task from the input field
    const task = input.value

    // Create a new date object that represents the current time
    const startTime = new Date()

    // Calculate the end time by adding two days to the start time
    const endTime = new Date(startTime.getTime() + 10 * 1000)
    //const endTime = new Date(startTime.getTime() + 2 * 24 * 60 * 60 * 1000)

    let spanID = 'task' + tasks.length;
    console.log(spanID)
    addToList(task, spanID);

    // Create a new timer using the start and end times
    const timer = new Timer(startTime, endTime, spanID)



    // Start the timer
    timer.start()

    //Add the task and timer to the array of tasks
    const taskTimer = {
        task,
        timer
    }
    taskTimer.task = task
    taskTimer.timer = timer
    if (manager.active) {
        console.log("Timer was already active")
        tasks.push(taskTimer);
        console.log("Timer was added to the timer manager")
        manager.activeTimers.push(taskTimer)
    } else {
        console.log("Timer manager was not active")
        tasks.push(taskTimer)
        console.log("Timer was added to the timer manager")
        manager.activeTimers.push(taskTimer)
        manager.start()
    }


    // Give the div element an id
    //div.id = toString(tasks.length - 1);
    input.value = ''

})



function addToList(task, spanID) {

    //Create a new task container
    var div = document.createElement("div");
    div.className = 'task-container';

    // Create the h1 element
    var h2 = document.createElement('h2');
    h2.className = 'task-name';

    // Create the p element
    var p = document.createElement('p');

    // Set the text content of teh p element
    p.textContent = 'Time remaining: ';

    // Create the span element
    var span = document.createElement('span');

    // Set the text content of the h1 element
    h2.textContent = task;

    span.id = spanID;

    // Append the span to the p element
    p.appendChild(span);
    p.id = spanID + 'p'
    p.className = 'timer-info';

    //Create new div element for close button
    var button = document.createElement("div");
    button.className = 'close-button';
    button.innerHTML = '&times;'

    div.appendChild(button);

    // Append the h1 and p elements to the div
    div.appendChild(h2);
    div.appendChild(p);



    // Create a new list item
    var li = document.createElement("li");

    // Set the text of the list item to the value of the input field
    li.appendChild(div);
    button.addEventListener('click', e => {
        removeTask(li);
    });
    // Add the list item to the list
    document.getElementById("task-list").appendChild(li);
}



function removeTask(li) {
    li.parentNode.removeChild(li);
}