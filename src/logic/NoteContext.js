import React, { createContext, useState } from 'react';

// Create a Context
export const NoteContext = createContext();

// Create a provider component
export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [archive, setArchive] = useState([]);
    const [bin, setBin] = useState([]);
    const [labels, setLabels] = useState({});

    const addNote = (note) => {
        setNotes([...notes, note]);
    };

    const addReminder = (reminder) => {
        setReminders([...reminders, reminder]);
    };

    const archiveNote = (note) => {
        setArchive([...archive, note]);
    };

    const deleteNote = (note) => {
        setBin([...bin, note]);
    };

    const addLabel = (labelName) => {
        if (!labels[labelName]) {
            setLabels({ ...labels, [labelName]: [] });
        }
    };

    const addNoteToLabel = (labelName, note) => {
        if (labels[labelName]) {
            setLabels({
                ...labels,
                [labelName]: [...labels[labelName], note],
            });
        }
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, reminders, addReminder, archive, archiveNote, bin, deleteNote, labels, addLabel, addNoteToLabel }}>
            {children}
        </NoteContext.Provider>
    );
};