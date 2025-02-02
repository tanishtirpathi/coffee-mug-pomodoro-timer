let totalSeconds, remainingSeconds;
let timer;
let alarm = new Audio("alarm.mp3"); // Replace with actual alarm sound file

function startTimer() {
  let minutes = document.getElementById("minutes").value || 0;
  let seconds = document.getElementById("seconds").value || 0;
  totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  remainingSeconds = totalSeconds;
  updateTimerDisplay();
  startCountdown();
}

function startCountdown() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerDisplay();
      updateCoffeeLevel();
    } else {
      clearInterval(timer);
      playAlarm();
    }
  }, 1000);
}

function updateTimerDisplay() {
  let min = Math.floor(remainingSeconds / 60)
    .toString()
    .padStart(2, "0");
  let sec = (remainingSeconds % 60).toString().padStart(2, "0");
  document.getElementById("timerDisplay").innerText = `${min}:${sec}`;
}

function updateCoffeeLevel() {
  let coffee = document.getElementById("coffee");
  let percentage = (remainingSeconds / totalSeconds) * 100;
  coffee.style.height = percentage + "%";
}

function playAlarm() {
  alarm.loop = true;
  alarm.play();
}

function resetTimer() {
  clearInterval(timer);
  alarm.pause();
  alarm.currentTime = 0;
  document.getElementById("timerDisplay").innerText = "00:00";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
  document.getElementById("coffee").style.height = "97%";
}
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `${taskText} <button class='delete' onclick='deleteTask(this)'>delete</button>`;
  let taskList = document.getElementById("taskList");
  taskList.insertBefore(li, taskList.firstChild); // Add new task at the top

  saveTasks();
  taskInput.value = "";
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push(li.innerText.replace("delete", "").trim());
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  tasks.reverse().forEach((taskText) => {
    // Reverse to maintain order when loading
    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class='delete' onclick='deleteTask(this)'>delete</button>`;
    taskList.insertBefore(li, taskList.firstChild);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  document
    .getElementById("taskInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
});
