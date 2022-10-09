import { AlertError } from './alert-error.js'
import { notNumber, calculateIMC } from './utils.js';

const imc = calculateIMC.imc;

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
  const nivelImc = getNivelImc(result);
  displayResultMessage(result, nivelImc);
}

function displayResultMessage(result, nivelImc) {
  const msg = `Seu IMC é de ${result} (${nivelImc})`;

  setResultado(msg, result);

}

function getNivelImc (result) {
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (result >= 39.9) return nivel[5];
  if (result >= 34.9) return nivel[4];
  if (result >= 29.9) return nivel[3];
  if (result >= 24.9) return nivel[2];
  if (result >= 18.5) return nivel[1];
  if (result < 18.5) return nivel[0];
}

function criaP () {
  const p = document.createElement('p');
  return p;
}

function setResultado (msg, result) {
  const resultado = document.querySelector('#resultado');
  resultado.innerHTML = '';

  const p = criaP();

  if (result >= 24.9) {
    p.classList.add('bad');
  } else {
    p.classList.add('paragrafo-resultado');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}

inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();

