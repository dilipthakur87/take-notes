// src/pages/HomePage.js
import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useCreateNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation, useGetNoteMutation } from '../hooks/queries/useNoteQueries';
import NoteModal from '../components/NoteModal';
import NoteList from '../components/NoteList';
import ConfirmationDialog from '../components/common/ConfirmationDialog'

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null)
  const [currentNote, setCurrentNote] = useState({
    title: '',
    body: '',
    reminder_date: ''
  });

  // note mutations
  const { data: notes, isLoading, error} = useGetNoteMutation()

  // we can use the specific isLoadings to handle the specific async operations like showing spinner or anything as per necessity.
  const { mutate: createNoteMutation, isLoading: createNoteLoading} = useCreateNoteMutation()
  const { mutate: updateNoteMutation, isLoading: updateNoteLoading} = useUpdateNoteMutation()
  const { mutate: deleteNoteMutation, isLoading: deleteNoteLoading} = useDeleteNoteMutation()

  const handleSaveNote = (note) => {
    let formattedReminderDate = ''
    let noteToSave = {...note}
    console.log('note to save == ', noteToSave);
    
    if(note.reminder_date) {
      const reminderDate = new Date(note.reminder_date);
      // Format the date to match the expected format: "YYYY-MM-DDTHH:mm:ss"
      formattedReminderDate = reminderDate.toISOString().slice(0, 19);

      noteToSave.reminder_date = formattedReminderDate
    }


    console.log('note to save 2 == ', noteToSave);



    if (noteToSave.id) {
      // Update existing note
      updateNoteMutation({ id: noteToSave.id, note: { ...noteToSave } });
    } else {
      // Create new note
      createNoteMutation(noteToSave);
    }
    setIsModalOpen(false);
    setCurrentNote({
      title: '',
      body: '',
      reminder_date: ''
    });
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteButton = (id) => {
    setIsConfirmationDialogOpen(true)
    setNoteIdToDelete(id)
  }

  const handleDeleteNote = () => {
    noteIdToDelete && deleteNoteMutation(noteIdToDelete);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading notes</div>;


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes App
          </Typography>
          <Button color="inherit" onClick={() => setIsModalOpen(true)}>
            New Note
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <NoteList notes={notes} onEdit={handleEditNote} onDelete={(noteId) => handleDeleteButton(noteId)} />
      </Container>

      <NoteModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        setCurrentNote={setCurrentNote}
        note={currentNote}
      />

      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
        onConfirm={handleDeleteNote}
        title="Delete Confirmation"
        message="Are you sure you want to delete this note?"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />

    </div>
  );
};

export default HomePage;
