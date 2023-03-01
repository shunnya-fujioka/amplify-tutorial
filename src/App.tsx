import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  WithAuthenticatorProps,
  Button,
  View,
} from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { ListNotesQuery, CreateNoteInput, DeleteNoteInput } from './API'
import { GraphQLResult } from '@aws-amplify/api-graphql';

const initialFormState: CreateNoteInput = { name: '', description: '' }

interface Props extends WithAuthenticatorProps { }

interface Note extends CreateNoteInput {
  // optional into required
  id: string;
}

function App({ signOut }: Props) {
  const [notes, setNotes] = useState<Note[]>([])
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql(graphqlOperation(listNotes)) as GraphQLResult<ListNotesQuery>;
    if (apiData.data?.listNotes?.items) {
      const notes = apiData.data.listNotes.items as Note[];
      setNotes(notes);
    }
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql(graphqlOperation(createNoteMutation, { input: formData }));
    fetchNotes();
    setFormData(initialFormState);
  }

  async function deleteNote({ id }: DeleteNoteInput) {
    const newNotesAray = notes.filter(note => note.id !== id);
    setNotes(newNotesAray);
    await API.graphql(graphqlOperation(deleteNoteMutation, { input: { id } }));
  }

  return (
    <View className="App">
      <h1>My Notes App</h1>
      {/* ノート作成 */}
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Note description"
        value={formData.description || ''}
      />
      <button onClick={createNote}>Create Note</button>
      {/* 各ノート表示 */}
      <div style={{ marginBottom: 30 }}>
        {notes.map(note => (
          <div key={note.id}>
            <h2>{note.name}</h2>
            <p>{note.description}</p>
            {/* ノート削除 */}
            <button onClick={() => deleteNote({ id: note.id })}>Delete note</button>
          </div>
        ))}
      </div>
      {/* サインアウト */}
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);