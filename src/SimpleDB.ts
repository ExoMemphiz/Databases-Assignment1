import fs from 'fs';
import readline from 'readline';
import path from 'path';

export interface DatabaseObject {
    key: any;
    value: any;
}

export default class SimpleDB {

    private hashMap: any;
    private dbPath: string;

    private splitCharacter = '\n';
    private splitKeyValue = String.fromCharCode(12);
    private deletedCharacter = String.fromCharCode(11);
    
    private endLine: number;

    constructor(dbPath: string) {
        this.dbPath = path.resolve(__dirname, dbPath);
        this.hashMap = {};
        this.endLine = 0;
    }

    public createHashMap() {
        return new Promise((resolve) => {
            this.readFile((dbOject, lineNumber) => {
                this.hashMap[dbOject.key] = lineNumber;
            }, 0, "FileEnd", (endLine) => {
                this.endLine = endLine;
                resolve();
            });
        })
    }
    
    addToDB(dbObject: DatabaseObject) {
        this.hashMap[dbObject.key] = this.endLine++;
        fs.appendFileSync(
            this.dbPath, 
            `${JSON.stringify(dbObject.key)}${this.splitKeyValue}${JSON.stringify(dbObject.value)}${this.splitCharacter}`
        );
    }
    
    deleteFromDB(key: any) {
        this.addToDB({
            key: key,
            value: this.deletedCharacter
        })
    }

    getFromDB(key: any): Promise<DatabaseObject> {
        return new Promise((resolve, reject) => {
            let index = this.hashMap[key];
            if (index !== undefined) {
                this.readFile((dbObject) => {
                    resolve(dbObject);
                }, index, index, () => {});
            } else {
                reject(`No index found for key: ${JSON.stringify(key)}`);
            }
        });
    }

    private readFile(readLine: (line: DatabaseObject, lineNumber: number) => void, startAt: number = 0, endAt: number | "FileEnd", finished: (endLine: number) => void) {
        let fileStream = fs.createReadStream(this.dbPath);
        const reader = readline.createInterface({
            input: fileStream
        });
        let curLine = 1;
        reader.on('line', (line) => {
            if (curLine >= startAt && (curLine <= endAt || endAt === "FileEnd")) {
                let parsed = this.parseLine(line);
                if (parsed) {
                    readLine(parsed, curLine);
                }
            }
            curLine++;
        });
        reader.on("close", () => {
            finished(curLine);
        })
    }

    private parseLine(line: string): DatabaseObject | undefined {
        let index = line.indexOf(this.splitKeyValue);
        if (index && line.length >= 2) {
            let key = JSON.parse(line.substring(0, index));
            let value = JSON.parse(line.substring(index + 1));
            return {key: key, value: value};
        }
        return undefined;
    }

}
