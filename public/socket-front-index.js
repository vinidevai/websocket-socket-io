import { alertAndRedirect } from './document.js';
import { insertDocLink } from './index.js';

/* eslint-disable */
const socket = io();

socket.emit('get_docs', (docs) => {
  docs.forEach((doc) => {
    insertDocLink(doc.name);
  });
});

function emitAddDoc(docName) {
  socket.emit('addDoc', docName);
}

socket.on('add_doc_interface', (docName) => {
  insertDocLink(docName);
});

socket.on('remove_doc_succeeded', (docName) => {
  console.log(docName + '2');
  alertAndRedirect(docName);
});

socket.on('doc_exists', (docName) => {
  alert(`O documento ${docName} ja existe...`);
});

export { emitAddDoc };