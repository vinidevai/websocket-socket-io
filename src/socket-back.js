import { findDocuments, updateDocs, getDocs, createDocs, deleteDoc } from './docs-db.js';
import io from './server.js';

io.on('connection', (socket) => {
  socket.on('get_docs', async (retrieveDocs) => {
    const docs = await getDocs();
    retrieveDocs(docs);
  });

  socket.on('select_document', async (docName, devolverTexto) => {
    socket.join(docName);
    const documento = await findDocuments(docName);
    
    if (documento) {
      devolverTexto(documento.text);
    }
  });

  socket.on('text_editor', async ({ text, docName }) => {
    const update = await updateDocs(docName, text);
    
    if (update.modifiedCount) {
      socket.to(docName).emit('text_editor_client', text);
    }
  });
  socket.on('addDoc', async (docName) => {
    const docExist = (await findDocuments(docName)) !== null;
    if (docExist) {
      socket.emit('doc_exists', docName);
    } else {
      const newDoc = await createDocs(docName);
      if (newDoc.acknowledged) {
        io.emit('add_doc_interface', docName);
      }
    }
  });
  socket.on('delete_doc', async (docName) => {
    const deletedDoc = await deleteDoc(docName);
    if (deletedDoc.deletedCount) {
      console.log(docName);
      io.emit('remove_doc_succeeded', docName);
    }
  });
});

