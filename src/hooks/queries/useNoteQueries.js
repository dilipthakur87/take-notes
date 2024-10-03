import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, createNote, updateNote, deleteNote } from '../../services/notesApi';

// Fetch notes using react-query
export const useGetNoteMutation = () =>{
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes,
    });
} 

// Create note mutation
export const useCreateNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn: createNote,
        onSuccess: () => {
          queryClient.invalidateQueries(['notes']);
        },
    });
} 

// Update note mutation
export const useUpdateNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, note }) => updateNote(id, note),
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
      },
    });
}

// Delete note mutation
export const useDeleteNoteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation( {
        mutationFn:  deleteNote,
        onSuccess: () => {
          queryClient.invalidateQueries(['notes']);
        },
     });
}