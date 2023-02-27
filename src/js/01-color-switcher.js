const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
let intervalId = null;

btnStopRef.disabled = true;

function changeBackgroundColor() {
  intervalId = setInterval(createBackgroundColor, 1000);
  btnStartRef.disabled = true;
  btnStopRef.disabled = false;
}
function stopChangeBackgroundColor() {
  clearInterval(intervalId);
  btnStopRef.disabled = true;
  btnStartRef.disabled = false;
}

function createBackgroundColor() {
  const bodyRef = document.body;
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartRef.addEventListener('click', changeBackgroundColor);
btnStopRef.addEventListener('click', stopChangeBackgroundColor);
