import { VStack, HStack, Text, Button, Image, Spacer } from "@chakra-ui/react";
import { DisplayNote } from "../types/DisplayNote";

interface Props {
  note: DisplayNote
}

export const NoteCard = ({ note }: Props) => {
  return (
    <VStack>
      <HStack>
        <Text fontSize="lg">{note.name}</Text>
        <Spacer />
        <Button>Delete</Button>
      </HStack>
      <Text fontSize="sm" textAlign="left">{note.description}</Text>
      {note.imageSrc && <Image src={note.imageSrc} maxWidth="400px" fit="contain" />}
    </VStack>
  );
}
