import { docsCollection } from './dbConnect.js';

function getDocs() {
  const documents = docsCollection.find().toArray();
  return documents;
}

function findDocuments(name) {
  const document = docsCollection.findOne({
    name
  });
  return document;
}

function updateDocs(docName, text) {
  const update = docsCollection.updateOne({ name: docName}, {
    $set: {
      text
    }
  });
  return update;
}

function createDocs(docName) {
  const create = docsCollection.insertOne({
    name: docName,
    text: ''
  });
  return create;
}

function deleteDoc(docName) {
  const remove = docsCollection.deleteOne({
    name: docName
  });
  return remove;
}

export { findDocuments, updateDocs, getDocs, createDocs, deleteDoc };