const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const notes = await Note.getNotes();
            res.send(notes);
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .post('/read', async (req, res) => {
        try {
            const note = await Note.login(req.body);
            console.log(note);
            res.send({...note, content});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .put('/edit', async (req, res) => {
        try {
            const note = await Note.editNote(req.body);
            res.send({...note, content});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            User.deleteNote(req.body.noteId);
            res.send({success: "Note Deleted"});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

module.exports = router;
