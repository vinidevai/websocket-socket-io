import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_STR);
let docsCollection;

try {
  await client.connect();
  const db = client.db('alura-websockets');
  docsCollection = db.collection('documents');

  console.log('MongoDB conectado com sucesso');
  
} catch (error) {
  console.log(error);
}

export { docsCollection };