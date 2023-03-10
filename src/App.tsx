import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { ListNotesQuery, CreateNoteInput, DeleteNoteInput, DeleteNoteMutationVariables, CreateNoteMutationVariables } from './API'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { DisplayNote } from "./types/DisplayNote";
import { VStack, Input, Heading, StackDivider, Center, Button, SimpleGrid } from "@chakra-ui/react";
import { NoteCard } from "./components/NoteCard";

const initialFormState: CreateNoteInput = { name: '', description: '', imageName: '' }

interface Props extends WithAuthenticatorProps { }

function App({ signOut }: Props) {
  const [notes, setNotes] = useState<DisplayNote[]>([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql(graphqlOperation(listNotes)) as GraphQLResult<ListNotesQuery>;
    if (apiData.data?.listNotes?.items) {
      const notesFromAPI = apiData.data.listNotes.items;
      const notes = await Promise.all(notesFromAPI.filter(note => !note?._deleted).map(async note => {
        const imageSrc = note?.imageName && await Storage.get(note.imageName);
        return { ...note, imageSrc }
      })) as DisplayNote[];
      setNotes(notes);
    }
  }

  async function createNote() {
    if (!formData.name) return;
    await API.graphql(graphqlOperation(createNoteMutation, { input: formData } as CreateNoteMutationVariables));
    fetchNotes();
    setFormData(initialFormState);
  }

  async function deleteNote({ id, _version }: DeleteNoteInput) {
    try {
      await API.graphql(graphqlOperation(deleteNoteMutation, { input: { id, _version } } as DeleteNoteMutationVariables));
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFormData({ ...formData, imageName: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  return (
    <Center>
      <VStack p={10} divider={<StackDivider />} width="container.md" align="center">
        <Heading>My Notes App</Heading>
        {/* ??????????????? */}
        <VStack width="container.sm">
          {/* ?????? */}
          <Input
            onChange={e => setFormData({ ...formData, 'name': e.target.value })}
            placeholder="Note name"
            value={formData.name}
          />
          {/* ?????? */}
          <Input
            onChange={e => setFormData({ ...formData, 'description': e.target.value })}
            placeholder="Note description"
            value={formData.description || ''}
          />
          {/* ?????? */}
          <input
            type="file"
            onChange={uploadImage}
          />
          <Button onClick={createNote} size="sm">Create Note</Button>
        </VStack>
        {/* ?????????????????? */}
        <SimpleGrid columns={1} spacing={3}>
          {notes.map(note => <NoteCard note={note} onDeleteButtonClick={deleteNote}/>)}
        </SimpleGrid>
        {/* ?????????????????? */}
        <Button onClick={signOut} size="sm">Sign Out</Button>
      </VStack>
    </Center>
  );
}

export default withAuthenticator(App);