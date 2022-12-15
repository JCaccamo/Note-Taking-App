const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const notes = await Note.getAllNotes();
            res.send(notes);
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .post('/create', async (req, res) => {
        try {
            let note = await Note.createNote(req.body);
            res.send({...note})
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .post('/read', async (req, res) => {
        try {
            let note = await Note.readNote(req.body);
            res.send({...note})
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .put('/edit', async (req, res) => {
        try {
            let note = await Note.editNote(req.body);
            res.send({...note})
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            Note.deleteNote(req.body.noteID);
            res.send({success: "Note Deleted"})
        } catch(err) {
            res.status(401).send({message: err.message});
        }
    })

module.exports = router;
