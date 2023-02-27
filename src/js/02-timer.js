import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const buttonStartRef = document.querySelector('button[data-start]');

buttonStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonStartRef.disabled = false;
    let startTime = Date.parse(selectedDates[0]) - Date.parse(new Date());
    let referencePoint = convertMs(startTime);
    let result = timeDisplay(referencePoint);
    function startTimer() {
      const IntervalId = setInterval(() => {
        startTime -= 1000;
        if (startTime < 1000) {
          Notiflix.Notify.info('The time has come !');
          clearInterval(IntervalId);
        }
        const referencePoint = convertMs(startTime);
        const result = timeDisplay(referencePoint);
        return result;
      }, 1000);
    }

    buttonStartRef.addEventListener('click', startTimer, { once: true });
  },
};

flatpickr('#datetime-picker', options);

function timeDisplay(startTimeObj) {
  for (const key in startTimeObj) {
    document.querySelector(`[data-${key}]`).textContent = addLeadingZero(
      startTimeObj[key]
    );
  }
  return startTimeObj;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
