// require dependencies - express Rouer method
const router = require('express').Router();
// require dependencies - store methods from store.js
const store = require('../../db/store');

// respond to call to "/api/notes" with all notes found in the DB
router.get('/notes', (req, res) => {
    store.getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        // respond with error if fails to get notes
        .catch((err) => res.status(500).json(err));
});


router.post('/notes', (req, res) => {
    store.addNote(req.body)
        .then((note) => res.json(note))
        // respond with error if fails to add note
        .catch((err) => res.status(500).json(err));
});


router.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id)
        .then(() => res.json({ok: true}))
        // rspond with error if action failed
        .catch((err) => res.status(500).json(err));
});


module.exports = router;