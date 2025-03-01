import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the Note interface
export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  hasReminder: boolean;
  isArchived: boolean;
  updatedAt: string;
}

// Define the context value type
export interface NoteContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updatedNote: Note) => void;
  reminders: Note[];
  addReminder: (reminder: Note) => void;
  archive: Note[];
  archiveNote: (note: Note) => void;
  bin: Note[];
  deleteNote: (note: Note) => void;
  labels: { [key: string]: Note[] };
  addLabel: (labelName: string) => void;
  addNoteToLabel: (labelName: string, note: Note) => void;
}

// Initial notes data
export const initialNoteData: Note[] = [
  { 
    id: '1a2b3c', 
    title: 'Meeting Notes', 
    content: "We have a meeting today", 
    isPinned: false,
    hasReminder: false,
    isArchived: false,
    updatedAt: new Date('2025-02-28').toISOString()
  },
  { 
    id: '4d5e6f', 
    title: 'Project Plan', 
    content: "Project planning details", 
    isPinned: true,
    hasReminder: false,
    isArchived: false,
    updatedAt: new Date('2025-03-01').toISOString()
  },
  { 
    id: '7g8h9i', 
    title: 'Shopping List', 
    content: "Groceries to buy", 
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-27').toISOString()
  }
];

// Create a Context
export const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Create a provider component
export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>(initialNoteData);
    const [reminders, setReminders] = useState<Note[]>([]);
    const [archive, setArchive] = useState<Note[]>([]);
    const [bin, setBin] = useState<Note[]>([]);
    const [labels, setLabels] = useState<{ [key: string]: Note[] }>({});

    // Initialize reminders from notes
    useEffect(() => {
        // Filter notes with hasReminder=true and set them as reminders
        const initialReminders = initialNoteData.filter(note => note.hasReminder);
        if (initialReminders.length > 0) {
            setReminders(initialReminders);
        }
    }, []);

    const addNote = (note: Note) => {
        // Check if note already exists
        const existingNoteIndex = notes.findIndex(n => n.id === note.id);
        
        if (existingNoteIndex !== -1) {
            // Update existing note
            const updatedNotes = [...notes];
            updatedNotes[existingNoteIndex] = note;
            setNotes(updatedNotes);
        } else {
            // Add new note
            setNotes([...notes, note]);
        }
        
        // If note has a reminder, add/update it in reminders as well
        if (note.hasReminder) {
            addReminder(note);
        }
    };
    
    const updateNote = (updatedNote: Note) => {
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
        
        // Update in reminders if needed
        if (updatedNote.hasReminder) {
            setReminders(reminders.map(reminder => 
                reminder.id === updatedNote.id ? updatedNote : reminder
            ));
        } else {
            // Remove from reminders if reminder is turned off
            setReminders(reminders.filter(reminder => reminder.id !== updatedNote.id));
        }
        
        // Update in archive if needed
        if (updatedNote.isArchived) {
            setArchive(archive.map(archivedNote => 
                archivedNote.id === updatedNote.id ? updatedNote : archivedNote
            ));
        } else {
            // Remove from archive if unarchived
            setArchive(archive.filter(archivedNote => archivedNote.id !== updatedNote.id));
        }
    };

    const addReminder = (reminder: Note) => {
        // Check if reminder already exists
        const existingReminderIndex = reminders.findIndex(r => r.id === reminder.id);
        
        if (existingReminderIndex !== -1) {
            // Update existing reminder
            const updatedReminders = [...reminders];
            updatedReminders[existingReminderIndex] = reminder;
            setReminders(updatedReminders);
        } else {
            // Add new reminder
            setReminders([...reminders, reminder]);
        }
    };

    const archiveNote = (note: Note) => {
        // If note already exists in archive, update it
        const existingArchiveIndex = archive.findIndex(n => n.id === note.id);
        
        if (existingArchiveIndex !== -1) {
            const updatedArchive = [...archive];
            updatedArchive[existingArchiveIndex] = note;
            setArchive(updatedArchive);
        } else {
            // Add to archive
            setArchive([...archive, note]);
            
            // Remove from main notes if being archived
            if (note.isArchived) {
                setNotes(notes.filter(n => n.id !== note.id));
            }
        }
    };

    const deleteNote = (note: Note) => {
        // Add to bin
        setBin([...bin, note]);
        
        // Remove from notes
        setNotes(notes.filter(n => n.id !== note.id));
        
        // Remove from reminders if it exists there
        if (note.hasReminder) {
            setReminders(reminders.filter(r => r.id !== note.id));
        }
        
        // Remove from archive if it exists there
        if (note.isArchived) {
            setArchive(archive.filter(a => a.id !== note.id));
        }
    };

    const addLabel = (labelName: string) => {
        if (!labels[labelName]) {
            setLabels({ ...labels, [labelName]: [] });
        }
    };

    const addNoteToLabel = (labelName: string, note: Note) => {
        if (labels[labelName]) {
            // Check if note already exists in this label
            const existingNoteIndex = labels[labelName].findIndex(n => n.id === note.id);
            
            if (existingNoteIndex !== -1) {
                // Update existing note in label
                const updatedLabelNotes = [...labels[labelName]];
                updatedLabelNotes[existingNoteIndex] = note;
                
                setLabels({
                    ...labels,
                    [labelName]: updatedLabelNotes,
                });
            } else {
                // Add new note to label
                setLabels({
                    ...labels,
                    [labelName]: [...labels[labelName], note],
                });
            }
        }
    };

    return (
        <NoteContext.Provider 
            value={{ 
                notes, 
                addNote, 
                updateNote,
                reminders, 
                addReminder, 
                archive, 
                archiveNote, 
                bin, 
                deleteNote, 
                labels, 
                addLabel, 
                addNoteToLabel 
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};