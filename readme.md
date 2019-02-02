# Simple_DB

Made by Chris Rosendorf

### Information

This implementation of Simple_DB includes a HashMap in the form of a JavaScript object.  
Any overwritten data stays in the database, but upon generating the HashMap, it will only index the latest change.  
Any deleted data is indexed in a specific way, to ensure that it is not read into the HashMap.  
  
Any valid JavaScript data type can be used as a key, and as the associated value in the database.  
These include arrays, nested objects and primitive data types, such as numbers, strings and more.  


### Installation

- Clone Repository
- Ensure NodeJS is installed and working on system
- Ensure TypeScript is globally installed through npm: `npm i -g typescript`
- Open 1 terminal in root directory of the project, then run `tsc -w` (Leave it open the whole time)
- Open another terminal, first run `npm i`, and then run the command: `npm start` 

### Usage

Inside App.ts you can change the code to play around with the functions and functionality of the database.  
There are 3 functions that can be used:

| Function | Parameter |
|---------|---|
| addToDB | DatabaseObject |
| deleteFromDB | Key: any |
| getFromDB | Key: any |
    
  
The DatabaseObject is based on the interface:  
  
`  
interface DatabaseObject {
    key: any;
    value: any;
}
`
