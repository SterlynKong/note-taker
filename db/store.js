const util = require('util');
const fs = require('fs');

// require npm uuid package to generate unique ids for notes
const uuidv1 = require('uuidv1');

// promisify readFile and writeFile methods so we can chain actions to them
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    };

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    };

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // if notes isn't an array return empty array 
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    };

    addNote(note) {
        // deconstruct the passed note
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("All notes must have a title and text content!")
        }

        // add a unique id to the note for storing
        const newNote = { title, text, id: uuidv1() };

        // add note to existing array of notes
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            // .then(() => newNote)
    };

    deleteNote(id) {
        // get current notes and remove the requested note by id
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    };
};


module.exports = new Store();