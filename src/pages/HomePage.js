// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Container, AppBar, Toolbar, Button, Typography, Alert } from '@mui/material';
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

  const [createError, setCreateError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // we can use the specific isLoadings to handle the specific async operations like showing spinner or anything as per necessity.
  
  // note mutations
  const { data: notes, isLoading, error} = useGetNoteMutation()
  
  // Create Note Mutation
  const { mutate: createNoteMutation, isLoading: createNoteLoading } = useCreateNoteMutation({
    onError: (error) => {
      console.log("error here == ", error);
      
      setCreateError(error?.response?.data?.error || 'Error creating note');
    },
  });

  // Update Note Mutation
  const { mutate: updateNoteMutation, isLoading: updateNoteLoading } = useUpdateNoteMutation({
    onError: (error) => {
      setUpdateError(error?.response?.data?.error || 'Error updating note');
    },
  });

  // Delete Note Mutation
  const { mutate: deleteNoteMutation, isLoading: deleteNoteLoading } = useDeleteNoteMutation({
    onError: (error) => {
      setDeleteError(error?.response?.data?.error || 'Error deleting note');
    },
  });

  const handleSaveNote = (note) => {
    setCreateError(null);
    setUpdateError(null);

    let formattedReminderDate = ''
    let noteToSave = {...note}
    console.log('note to save == ', noteToSave);
    
    if(note.reminder_date) {
      const reminderDate = new Date(note.reminder_date);
      // Format the date to match the expected format: "YYYY-MM-DDTHH:mm:ss"
      formattedReminderDate = reminderDate.toISOString().slice(0, 19);

      noteToSave.reminder_date = formattedReminderDate
    }

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
    setDeleteError(null);
    if (noteIdToDelete) {
      deleteNoteMutation(noteIdToDelete);
      setIsConfirmationDialogOpen(false);
    }
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
        {/* Display error alerts */}
        {createError && <Alert severity="error">{createError}</Alert>}
        {updateError && <Alert severity="error">{updateError}</Alert>}
        {deleteError && <Alert severity="error">{deleteError}</Alert>}

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
