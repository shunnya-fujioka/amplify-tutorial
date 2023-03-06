import { Text, Button, Image, Card, CardHeader, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import { API, graphqlOperation } from "aws-amplify";
import { DeleteNoteInput } from "../API";
import { DisplayNote } from "../types/DisplayNote";

interface Props {
  note: DisplayNote
  onDeleteButtonClick: (note: DeleteNoteInput) => void
}

export const NoteCard = ({ note, onDeleteButtonClick }: Props) => {
  return (
    <Card width="container.sm" alignContent="space-between" key={note.id}>
      <CardHeader>
        <Heading size="sm">{note.name}</Heading>
      </CardHeader>
      {(note.description || note.imageSrc) &&
        <CardBody>
          <Text fontSize="sm">{note.description}</Text>
          {note.imageSrc && <Image src={note.imageSrc} maxWidth="sm" fit="contain" />}
        </CardBody>}
      <CardFooter>
        <Button size="sm" onClick={() => onDeleteButtonClick(note)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
