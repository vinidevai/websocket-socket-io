import { emitAddDoc } from './socket-front-index.js';

/* eslint-disable */
const docsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const formInput = document.getElementById('input-documento');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  emitAddDoc(formInput.value);
  formInput.value = '';
})

function insertDocLink(docName) {
  docsList.innerHTML += `
    <a href="documento.html?nome=${docName}" class="list-group-item list-group-item-action" id="documento-${docName}">
        ${docName}
    </a>
  `;
}

function removeDocLink(docName) {
  const doc = document.getElementById(`documento-${docName}`);
  docsList.removeChild(doc);
}

export { insertDocLink, removeDocLink };