import { alertAndRedirect, updateTextEditor } from './document.js';

// eslint-disable-next-line
const socket = io();

function select_document(nome) {
  socket.emit('select_document', nome, (text) => {
    updateTextEditor(text);
  });
}

function emitTextEditor(data) {
  socket.emit('text_editor', data);
}

function emitDeleteDoc(docName) {
  socket.emit('delete_doc', docName);
}

socket.on('text_editor_client', (text) => {
  updateTextEditor(text);
});

socket.on('remove_doc_succeeded', (docName) => {
  console.log(docName + '2');
  alertAndRedirect(docName);
});

export { emitTextEditor, emitDeleteDoc, select_document };