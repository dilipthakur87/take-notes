// src/components/NoteModal.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

const NoteModal = (props) => {

  const { isOpen, onRequestClose, onSave, setCurrentNote, note } = props
  console.log("bnote == ", note.reminder_date);  

  const handleSubmit = () => {
    onSave(note);
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="sm">
      <DialogTitle>{note?.id ? 'Edit Note' : 'Create New Note'}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={note?.title}
            onChange={(e) => setCurrentNote({...note, title: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            margin="dense"
            label="Body"
            multiline
            minRows={4}
            fullWidth
            required
            variant="outlined"
            defaultValue={note?.body}
            onChange={(e) => setCurrentNote({...note, body: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <Typography variant="subtitle1" sx={{ marginBottom: '8px', marginTop: '16px' }}>
            Set Reminder
          </Typography>
          <DateTimePicker
            label="Reminder Date and Time"
            defaultValue={dayjs(note?.reminder_date + 'Z')}
            onChange={(newDate) => {
              console.log("date on change == ", newDate);
              
              setCurrentNote({...note, reminder_date: newDate})
            }}
            renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
            sx={{ marginBottom: '16px' }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onRequestClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!note.body}>
          {note.id ? 'Update' :'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;
