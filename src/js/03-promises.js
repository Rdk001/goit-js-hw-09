import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  inputs: document.querySelectorAll('input[type="number"]'),
};
const formObj = {};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function promisResult(promise) {
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

function start(e) {
  for (const input of refs.inputs) {
    formObj[input.name] = input.value;
  }
  e.preventDefault();
  for (let i = 0; i < formObj.amount; i += 1) {
    if (Number(formObj.amount) === 0) {
      return;
    }
    promisResult(
      createPromise(i + 1, Number(formObj.delay) + Number(formObj.step) * i)
    );
  }
}
refs.form.addEventListener('submit', start);
