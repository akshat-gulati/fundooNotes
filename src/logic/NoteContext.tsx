import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Updated Note interface with reminderDateTime
export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  hasReminder: boolean;
  isArchived: boolean;
  updatedAt: string;
  reminderDateTime?: string; // Optional field for storing reminder time and date
}

// Define the context value type
export interface NoteContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updatedNote: Note) => void;
  reminders: Note[];
  addReminder: (reminder: Note, dateTime?: string) => void; // Updated to accept dateTime
  archive: Note[];
  archiveNote: (note: Note) => void;
  unarchiveNote: (note: Note) => void; // Added missing function
  bin: Note[];
  deleteNote: (note: Note) => void;
  restoreNote: (note: Note) => void; // Added missing function
  labels: { [key: string]: Note[] };
  addLabel: (labelName: string) => void;
  addNoteToLabel: (labelName: string, note: Note) => void;
  removeNoteFromLabel: (labelName: string, noteId: string) => void; // Added missing function
  deleteLabel: (labelName: string) => void;
}

// Initial notes data
export const initialNoteData: Note[] = [{
    id: '1',
    title: 'Meeting Notes',
    content: 'We have a meeting today',
    isPinned: false,
    hasReminder: false,
    isArchived: true,
    updatedAt: new Date('2025-02-28').toISOString(),
  }, {
    id: '2',
    title: 'Project Plan',
    content: 'Project planning details',
    isPinned: true,
    hasReminder: false,
    isArchived: false,
    updatedAt: new Date('2025-03-01').toISOString(),
  }, {
    id: '3',
    title: 'Shopping List',
    content: 'Groceries to buy',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-27').toISOString(),
    reminderDateTime: new Date('2025-03-05T14:00:00').toISOString(), // Example date/time
  }, {
    id: '4',
    title: 'Workout Routine',
    content: 'Morning workout schedule',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-03-01').toISOString(),
    reminderDateTime: new Date('2025-03-06T07:00:00').toISOString(),
  }, {
    id: '5',
    title: 'Birthday Reminder',
    content: 'Don\'t forget to buy a gift',
    isPinned: true,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-25').toISOString(),
    reminderDateTime: new Date('2025-03-10T10:00:00').toISOString(),
  }, {
    id: '6',
    title: 'Recipe Ideas',
    content: 'Try new pasta recipe',
    isPinned: false,
    hasReminder: false,
    isArchived: true,
    updatedAt: new Date('2025-02-20').toISOString(),
  }, {
    id: '7',
    title: 'Book List',
    content: 'Books to read this month',
    isPinned: false,
    hasReminder: false,
    isArchived: false,
    updatedAt: new Date('2025-02-22').toISOString(),
  }, {
    id: '8',
    title: 'Travel Plans',
    content: 'Itinerary for the trip',
    isPinned: true,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-28').toISOString(),
    reminderDateTime: new Date('2025-03-15T09:00:00').toISOString(),
  }, {
    id: '9',
    title: 'Conference Call',
    content: 'Join the call at 3 PM',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-03-01').toISOString(),
    reminderDateTime: new Date('2025-03-05T15:00:00').toISOString(),
  }, {
    id: '10',
    title: 'Grocery List',
    content: 'Buy vegetables and fruits',
    isPinned: false,
    hasReminder: false,
    isArchived: true,
    updatedAt: new Date('2025-02-26').toISOString(),
  }, {
    id: '11',
    title: 'Dentist Appointment',
    content: 'Appointment at 11 AM',
    isPinned: true,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-24').toISOString(),
    reminderDateTime: new Date('2025-03-07T11:00:00').toISOString(),
  }, {
    id: '12',
    title: 'Team Meeting',
    content: 'Discuss project updates',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-28').toISOString(),
    reminderDateTime: new Date('2025-03-04T10:00:00').toISOString(),
  }, {
    id: '13',
    title: 'Weekend Plans',
    content: 'Plan for the weekend',
    isPinned: false,
    hasReminder: false,
    isArchived: true,
    updatedAt: new Date('2025-02-21').toISOString(),
  }, {
    id: '14',
    title: 'Client Presentation',
    content: 'Prepare slides for presentation',
    isPinned: true,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-23').toISOString(),
    reminderDateTime: new Date('2025-03-08T14:00:00').toISOString(),
  }, {
    id: '15',
    title: 'Gardening Tips',
    content: 'Tips for spring gardening',
    isPinned: false,
    hasReminder: false,
    isArchived: false,
    updatedAt: new Date('2025-02-19').toISOString(),
  }, {
    id: '16',
    title: 'Yoga Session',
    content: 'Evening yoga routine',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-27').toISOString(),
    reminderDateTime: new Date('2025-03-05T18:00:00').toISOString(),
  }, {
    id: '17',
    title: 'Car Service',
    content: 'Service appointment at 9 AM',
    isPinned: true,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-26').toISOString(),
    reminderDateTime: new Date('2025-03-09T09:00:00').toISOString(),
  }, {
    id: '18',
    title: 'Dinner Reservation',
    content: 'Reservation at 7 PM',
    isPinned: false,
    hasReminder: true,
    isArchived: false,
    updatedAt: new Date('2025-02-25').toISOString(),
    reminderDateTime: new Date('2025-03-06T19:00:00').toISOString(),
  }];

// Initial label data mapping
export const initialLabelData = {
  'Work': ['2', '9', '12', '14'], // Project Plan, Conference Call, Team Meeting, Client Presentation
  'Personal': ['3', '4', '5', '7', '15', '16'], // Shopping List, Workout Routine, Birthday Reminder, Book List, Gardening Tips, Yoga Session
  'Health': ['4', '11', '16'], // Workout Routine, Dentist Appointment, Yoga Session
  'Travel': ['8', '13'], // Travel Plans, Weekend Plans
  'Food': ['3', '6', '10', '18'], // Shopping List, Recipe Ideas, Grocery List, Dinner Reservation
  'Appointments': ['11', '12', '17', '18'] // Dentist Appointment, Team Meeting, Car Service, Dinner Reservation
};

// Create a Context
export const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Create a provider component
export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [reminders, setReminders] = useState<Note[]>([]);
    const [archive, setArchive] = useState<Note[]>([]);
    const [bin, setBin] = useState<Note[]>([]);
    const [labels, setLabels] = useState<{ [key: string]: Note[] }>({});

    // Initialize notes and reminders from initialNoteData
    useEffect(() => {
        // Filter notes that aren't archived
        const activeNotes = initialNoteData.filter(note => !note.isArchived);
        setNotes(activeNotes);
        
        // Filter archived notes
        const archivedNotes = initialNoteData.filter(note => note.isArchived);
        setArchive(archivedNotes);
        
        // Filter notes with hasReminder=true and set them as reminders
        const initialReminders = initialNoteData.filter(note => note.hasReminder);
        if (initialReminders.length > 0) {
            setReminders(initialReminders);
        }
        
        // Initialize labels with dummy data
        const initialLabels: { [key: string]: Note[] } = {};
        
        // Process each label and add corresponding notes
        Object.keys(initialLabelData).forEach(labelName => {
            initialLabels[labelName] = [];
            const noteIds = initialLabelData[labelName];
            
            noteIds.forEach(noteId => {
                const note = initialNoteData.find(n => n.id === noteId);
                if (note) {
                    initialLabels[labelName].push(note);
                }
            });
        });
        
        setLabels(initialLabels);
    }, []);

    const addNote = (note: Note) => {
        const noteWithUpdatedTime = {
            ...note,
            updatedAt: new Date().toISOString()
        };
        
        // Check if note already exists
        const existingNoteIndex = notes.findIndex(n => n.id === note.id);
        if (existingNoteIndex !== -1) {
            // Update existing note
            const updatedNotes = [...notes];
            updatedNotes[existingNoteIndex] = noteWithUpdatedTime;
            setNotes(updatedNotes);
        } else {
            // Add new note
            setNotes([...notes, noteWithUpdatedTime]);
        }
        
        // If note has a reminder, add/update it in reminders as well
        if (noteWithUpdatedTime.hasReminder) {
            addReminder(noteWithUpdatedTime, noteWithUpdatedTime.reminderDateTime);
        }
    };
    
    const updateNote = (updatedNote: Note) => {
        const noteWithUpdatedTime = {
            ...updatedNote,
            updatedAt: new Date().toISOString()
        };
        
        // If the note is archived, update it in archive collection
        if (noteWithUpdatedTime.isArchived) {
            const existingInArchive = archive.some(note => note.id === noteWithUpdatedTime.id);
            
            if (existingInArchive) {
                // Update in archive if it already exists there
                setArchive(archive.map(archivedNote =>
                    archivedNote.id === noteWithUpdatedTime.id ? noteWithUpdatedTime : archivedNote
                ));
            } else {
                // Add to archive and remove from notes
                setArchive([...archive, noteWithUpdatedTime]);
                setNotes(notes.filter(note => note.id !== noteWithUpdatedTime.id));
            }
        } else {
            // If not archived, update in notes collection
            const existingInNotes = notes.some(note => note.id === noteWithUpdatedTime.id);
            
            if (existingInNotes) {
                // Update existing note
                setNotes(notes.map(note => 
                    note.id === noteWithUpdatedTime.id ? noteWithUpdatedTime : note
                ));
            } else {
                // Add to notes and remove from archive if it was previously archived
                setNotes([...notes, noteWithUpdatedTime]);
                setArchive(archive.filter(note => note.id !== noteWithUpdatedTime.id));
            }
        }
        
        // Update in reminders if needed
        if (noteWithUpdatedTime.hasReminder) {
            const existingInReminders = reminders.some(note => note.id === noteWithUpdatedTime.id);
            
            if (existingInReminders) {
                // Update existing reminder
                setReminders(reminders.map(reminder =>
                    reminder.id === noteWithUpdatedTime.id ? noteWithUpdatedTime : reminder
                ));
            } else {
                // Add to reminders
                setReminders([...reminders, noteWithUpdatedTime]);
            }
        } else {
            // Remove from reminders if reminder is turned off
            setReminders(reminders.filter(reminder => reminder.id !== noteWithUpdatedTime.id));
        }
        
        // Update in all labels
        Object.keys(labels).forEach(labelName => {
            const noteInLabel = labels[labelName].some(note => note.id === noteWithUpdatedTime.id);
            if (noteInLabel) {
                setLabels({
                    ...labels,
                    [labelName]: labels[labelName].map(labelNote =>
                        labelNote.id === noteWithUpdatedTime.id ? noteWithUpdatedTime : labelNote
                    )
                });
            }
        });
    };

    const addReminder = (reminder: Note, dateTime?: string) => {
        // If dateTime is provided, update or set the reminderDateTime
        const reminderToAdd = {
            ...reminder,
            hasReminder: true,
            reminderDateTime: dateTime || reminder.reminderDateTime || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Check if reminder already exists
        const existingReminderIndex = reminders.findIndex(r => r.id === reminderToAdd.id);
        if (existingReminderIndex !== -1) {
            // Update existing reminder
            const updatedReminders = [...reminders];
            updatedReminders[existingReminderIndex] = reminderToAdd;
            setReminders(updatedReminders);
        } else {
            // Add new reminder
            setReminders([...reminders, reminderToAdd]);
        }
        
        // Update in the appropriate collection (notes or archive)
        if (reminderToAdd.isArchived) {
            setArchive(archive.map(note => 
                note.id === reminderToAdd.id ? reminderToAdd : note
            ));
        } else {
            setNotes(notes.map(note => 
                note.id === reminderToAdd.id ? reminderToAdd : note
            ));
        }
    };

    const archiveNote = (note: Note) => {
        const noteToArchive = {
            ...note,
            isArchived: true,
            updatedAt: new Date().toISOString()
        };
        
        // Remove from notes
        setNotes(notes.filter(n => n.id !== noteToArchive.id));
        
        // Add to archive
        const existingArchiveIndex = archive.findIndex(n => n.id === noteToArchive.id);
        if (existingArchiveIndex !== -1) {
            // Update existing archived note
            const updatedArchive = [...archive];
            updatedArchive[existingArchiveIndex] = noteToArchive;
            setArchive(updatedArchive);
        } else {
            // Add new archived note
            setArchive([...archive, noteToArchive]);
        }
        
        // Update in reminders if needed
        if (noteToArchive.hasReminder) {
            setReminders(reminders.map(reminder =>
                reminder.id === noteToArchive.id ? noteToArchive : reminder
            ));
        }
        
        // Update in labels
        Object.keys(labels).forEach(labelName => {
            const noteInLabel = labels[labelName].some(n => n.id === noteToArchive.id);
            if (noteInLabel) {
                setLabels({
                    ...labels,
                    [labelName]: labels[labelName].map(labelNote =>
                        labelNote.id === noteToArchive.id ? noteToArchive : labelNote
                    )
                });
            }
        });
    };

    const unarchiveNote = (note: Note) => {
        const noteToUnarchive = {
            ...note,
            isArchived: false,
            updatedAt: new Date().toISOString()
        };
        
        // Remove from archive
        setArchive(archive.filter(n => n.id !== noteToUnarchive.id));
        
        // Add to notes
        const existingNoteIndex = notes.findIndex(n => n.id === noteToUnarchive.id);
        if (existingNoteIndex !== -1) {
            // Update existing note
            const updatedNotes = [...notes];
            updatedNotes[existingNoteIndex] = noteToUnarchive;
            setNotes(updatedNotes);
        } else {
            // Add new note
            setNotes([...notes, noteToUnarchive]);
        }
        
        // Update in reminders if needed
        if (noteToUnarchive.hasReminder) {
            setReminders(reminders.map(reminder =>
                reminder.id === noteToUnarchive.id ? noteToUnarchive : reminder
            ));
        }
        
        // Update in labels
        Object.keys(labels).forEach(labelName => {
            const noteInLabel = labels[labelName].some(n => n.id === noteToUnarchive.id);
            if (noteInLabel) {
                setLabels({
                    ...labels,
                    [labelName]: labels[labelName].map(labelNote =>
                        labelNote.id === noteToUnarchive.id ? noteToUnarchive : labelNote
                    )
                });
            }
        });
    };

    const deleteNote = (note: Note) => {
        const noteToDelete = {
            ...note,
            updatedAt: new Date().toISOString()
        };
        
        // Add to bin
        setBin([...bin, noteToDelete]);
        
        // Remove from appropriate collection
        if (noteToDelete.isArchived) {
            setArchive(archive.filter(n => n.id !== noteToDelete.id));
        } else {
            setNotes(notes.filter(n => n.id !== noteToDelete.id));
        }
        
        // Remove from reminders if it exists there
        if (noteToDelete.hasReminder) {
            setReminders(reminders.filter(r => r.id !== noteToDelete.id));
        }
        
        // Remove from all labels
        Object.keys(labels).forEach(labelName => {
            setLabels({
                ...labels,
                [labelName]: labels[labelName].filter(n => n.id !== noteToDelete.id)
            });
        });
    };

    const restoreNote = (note: Note) => {
        // Remove from bin
        setBin(bin.filter(n => n.id !== note.id));
        
        // Add back to appropriate collection
        if (note.isArchived) {
            setArchive([...archive, note]);
        } else {
            setNotes([...notes, note]);
        }
        
        // Add back to reminders if it has a reminder
        if (note.hasReminder) {
            setReminders([...reminders, note]);
        }
    };

    const addLabel = (labelName: string) => {
        if (!labels[labelName]) {
            setLabels({ ...labels, [labelName]: [] });
        }
    };
    
    const deleteLabel = (labelName: string) => {
        if (labels[labelName]) {
          // Create a copy of labels without the deleted label
          const updatedLabels = { ...labels };
          delete updatedLabels[labelName];
          setLabels(updatedLabels);
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

    const removeNoteFromLabel = (labelName: string, noteId: string) => {
        if (labels[labelName]) {
            setLabels({
                ...labels,
                [labelName]: labels[labelName].filter(note => note.id !== noteId)
            });
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
                unarchiveNote,
                bin,
                deleteNote,
                restoreNote,
                labels,
                addLabel,
                addNoteToLabel,
                removeNoteFromLabel,
                deleteLabel,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
};