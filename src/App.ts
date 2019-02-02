import SimpleDB, { DatabaseObject } from './SimpleDB';

async function initDatabase(): Promise<SimpleDB> {
    let db = new SimpleDB('../simple.db');
    await db.createHashMap();
    return db;
}

async function runTest() {
    //Initialize the database
    let db = await initDatabase();
    
    //This is a key we use to store and retrieve the data.
    let key = "Chris";

    //We use a specific interface, "DatabaseObject", which has 2 fields, a key, and a value
    let databaseObject: DatabaseObject = {
        key: key,
        value: {
            value: "Can be anything, even an array or another object",
            anArray: [45, "a", 29, -111]
        }
    }

    //Adds an object to the database, must be of type DatabaseObject
    db.addToDB(databaseObject);

    //We try to retrieve the object using the key:
    let check = await db.getFromDB(key);

    //And we can log the value associated with the key
    console.log(check.value);
}

runTest();
