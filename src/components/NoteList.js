// src/components/NoteList.js
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';

const NoteList = ({ onEdit, notes, onDelete }) => {
  return (
    <>
      {notes.length > 0 ? (
        <Box sx={{ width: '100%' }}>
          {notes.map((note) => (
            <Card key={note.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {note.title ? note.title : "Untitled"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {note.body}
                </Typography>
                {note.reminder_date && (
                  <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
                    Reminder: {new Date(note.reminder_date + 'Z').toLocaleString()}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(note)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(note.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6" color="text.secondary" align="center">
            No notes created yet
          </Typography>
        </Box>
      )}
    </>
  );
};

export default NoteList;
