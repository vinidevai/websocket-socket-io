import { emitDeleteDoc, emitTextEditor, select_document } from './socket-front-document.js';

/* eslint-disable */

// Adicionamos um ouvinte para garantir que o código só rode após o DOM estar carregado
document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const docName = params.get('nome');

    // **VERIFIQUE SE OS IDS EXISTEM NO SEU HTML**
    // 1. Verifique se existe <textarea id="editor-texto">
    const textEditor = document.getElementById('editor-texto');
    // 2. Verifique se existe um elemento (h1, h2, div, etc.) com id="titulo-documento"
    const docTitle = document.getElementById('titulo-documento'); 
    // 3. Verifique se existe um elemento (button, a, etc.) com id="excluir-documento"
    const deleteButton = document.getElementById('excluir-documento');

    // Esta linha estava na linha 14 e causava o erro se o elemento não fosse encontrado
    if (docTitle) {
        docTitle.textContent = docName || 'Documento sem titulo';
    }


    select_document(docName);
    

    // O restante do seu código de listeners...
    if (textEditor) {
        textEditor.addEventListener('keyup', () => {
            emitTextEditor({
                text: textEditor.value,
                docName
            });
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            emitDeleteDoc(docName);
        });
    }
});


// As funções que precisam ser exportadas devem ser definidas FORA do listener,
// OU você deve garantir que o import seja tratado no arquivo que as utiliza.

function updateTextEditor(text) {
    const textEditor = document.getElementById('editor-texto');
    if (textEditor) {
        textEditor.value = text;
    }
}

function alertAndRedirect(docName) {
  console.log(docName);
  
    window.location.href = '/';
    alert(`Documento "${docName}" excluido com sucesso!`);
}

export { updateTextEditor, alertAndRedirect };