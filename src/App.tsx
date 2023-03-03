import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  WithAuthenticatorProps,
  Button,
  View,
} from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { ListNotesQuery, CreateNoteInput, DeleteNoteInput, DeleteNoteMutationVariables, CreateNoteMutationVariables } from './API'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { NoteCardCollection } from "./ui-components"


const initialFormState: CreateNoteInput = { name: '', description: '', imageName: '' }

interface Props extends WithAuthenticatorProps { }

interface Note extends CreateNoteInput {
  // optional into required
  id: string;
  _version: number | null | undefined;
  // `Storage.get()`で取得した値を格納
  imageSrc?: string | null | undefined;
}

function App({ signOut }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
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
      })) as Note[];
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
    <View className="App">
      <h1>My Notes App</h1>
      {/* ノート作成 */}
      {/* 名前 */}
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      {/* 内容 */}
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Note description"
        value={formData.description || ''}
      />
      {/* 画像 */}
      <input
        type="file"
        onChange={uploadImage}
      />
      <button onClick={createNote}>Create Note</button>
      {/* 各ノート表示 */}
      <NoteCardCollection />
      {/* サインアウト */}
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);