import { SimpleGrid } from '@chakra-ui/react'
import { DisplayNote } from '../types/DisplayNote';
import { NoteCard } from "../components/NoteCard";

interface Props {
  notes: DisplayNote[]
}

export const NoteCardCollection = ({ notes }: Props) => {
  return (
    <SimpleGrid minChildWidth="container.lg" columns={2} spacing={5}>
      {notes.map(note => <NoteCard note={note} key={note.id} />)}
    </SimpleGrid>
  );
}
