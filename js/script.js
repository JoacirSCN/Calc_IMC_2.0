import { Modal } from './modal.js';
import { AlertError } from './alert-error.js'
import { notNumber, calculateIMC } from './utils.js';

const form = document.querySelector('form');
const inputWeight = document.querySelector('#weight');
const inputHeight = document.querySelector('#height');

form.onsubmit = event => {
  event.preventDefault();

  const weight = Number(inputWeight.value);
  const height = Number(inputHeight.value);

  const weightOrHeightIsNotANumber = notNumber(weight) || notNumber(height);

  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    return
  }

  const result = calculateIMC(weight, height);
  displayResultMessage(result);
}

function displayResultMessage(result) {
  const msg = `Seu IMC é de ${result}`;

  Modal.message.innerText = msg;
  Modal.open();
}

inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();
