import { emitDeleteDoc, emitTextEditor, select_document } from './socket-front-document.js';

/* eslint-disable */

// ----------------------------------------------------
// 1. OBTENÇÃO DE ELEMENTOS E DADOS (Executado imediatamente)
// ----------------------------------------------------

const params = new URLSearchParams(window.location.search);
const docName = params.get('nome'); // Variável usada nas funções exportadas

// **VERIFIQUE SE OS IDS EXISTEM NO SEU HTML**
const textEditor = document.getElementById('editor-texto');
const docTitle = document.getElementById('titulo-documento');
const deleteButton = document.getElementById('excluir-documento');

// Define o título do documento (agora sem o listener DOMContentLoaded)
if (docTitle) {
    docTitle.textContent = docName || 'Documento sem titulo';
}

// Inicia a conexão do socket para o documento
select_document(docName);


// ----------------------------------------------------
// 2. CONFIGURAÇÃO DE LISTENERS
// ----------------------------------------------------

// Listener do Editor de Texto
if (textEditor) {
    textEditor.addEventListener('keyup', () => {
        emitTextEditor({
            text: textEditor.value,
            docName
        });
    });
}

// Listener do Botão de Excluir
if (deleteButton) {
    deleteButton.addEventListener('click', () => {
        emitDeleteDoc(docName);
    });
}


// ----------------------------------------------------
// 3. FUNÇÕES EXPORTADAS
// ----------------------------------------------------

function updateTextEditor(text) {
    // Busca o elemento dentro da função para garantir que ele exista
    const textEditor = document.getElementById('editor-texto'); 
    if (textEditor) {
        textEditor.value = text;
    }
}

function alertAndRedirect(name) {
    // Usa 'docName' do escopo global do módulo
    if (name === docName) {
        window.location.href = '/';
        alert(`Documento "${docName}" excluido com sucesso!`);
    }
}

export { updateTextEditor, alertAndRedirect };