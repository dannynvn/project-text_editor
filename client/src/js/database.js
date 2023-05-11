import { openDB } from 'idb';

const initdb = async () =>
// create a new database called jate using version 1
  openDB('jate', 1, {
    // if the database is new, create an object store called jate
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
  console.log('Adding content to database');

  // create connection to database
  const db = await openDB('jate', 1);

  // create transaction to add content to database
  const tx = db.transaction('jate', 'readwrite');

  // open object store
  const store = tx.objectStore('jate');

  // update object store with content
  const request = await store.put(content);

  // get confirmation of content addition
  const result = await request;
  console.log('result', result);



// gets all the content from the database
export const getDb = async () => {
  console.log('Retrieving content from database');

  // create connection to database
  const db = await openDB('jate', 1);

  // create transaction to get content from database
  const tx = db.transaction('jate', 'readonly');

  // open object store
  const store = tx.objectStore('jate');

  // get all content from object store
  const content = store.getAll();

  // get confirmation of content retrieval
  const result = await content;
  console.log('result.value', result)
  return result;
};

initdb();
