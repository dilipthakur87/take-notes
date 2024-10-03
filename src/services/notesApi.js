import { api } from './api'

export const fetchNotes = async () => {
  const { data } = await api.get('/notes');
  return data;
};

export const createNote = async (note) => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const updateNote = async (noteId, note) => {
  console.log("note in api == ", note);
  
  console.log(typeof note);
  
  const { data } = await api.put(`/notes/${noteId}`, JSON.stringify(note), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return data;
};

export const deleteNote = async (noteId) => {
  const { data } = await api.delete(`/notes/${noteId}`);
  return data;
};
