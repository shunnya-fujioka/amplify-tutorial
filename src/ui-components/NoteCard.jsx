/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Note } from "../models";
import {
  getOverrideProps,
  useDataStoreDeleteAction,
} from "@aws-amplify/ui-react/internal";
import { schema } from "../models/schema";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
export default function NoteCard(props) {
  const { note, overrides, ...rest } = props;
  const deleteButtonOnClick = useDataStoreDeleteAction({
    id: note?.id,
    model: Note,
    schema: schema,
  });
  return (
    <Flex
      gap="5px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflow="hidden"
      position="relative"
      border="0.5px SOLID rgba(0,0,0,0.5)"
      boxShadow="0px 1px 2px rgba(0, 0, 0, 0.25)"
      borderRadius="3px"
      padding="9.5px 9.5px 9.5px 9.5px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NoteCard")}
      {...rest}
    >
      <Flex
        gap="200px"
        direction="row"
        width="400px"
        height="unset"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 3px 0px 3px"
        backgroundColor="rgba(255,255,255,1)"
        {...getOverrideProps(overrides, "Frame 2")}
      >
        <Flex
          padding="0px 0px 0px 0px"
          width="74px"
          height="54px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          {...getOverrideProps(overrides, "Group 1")}
        >
          <Text
            fontFamily="Inter"
            fontSize="24px"
            fontWeight="400"
            color="rgba(0,0,0,1)"
            lineHeight="36px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            position="absolute"
            top="0px"
            left="0px"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={note?.name}
            {...getOverrideProps(overrides, "name")}
          ></Text>
          <Text
            fontFamily="Inter"
            fontSize="14px"
            fontWeight="400"
            color="rgba(0,0,0,1)"
            lineHeight="21px"
            textAlign="left"
            display="block"
            direction="column"
            justifyContent="unset"
            width="unset"
            height="unset"
            gap="unset"
            alignItems="unset"
            position="absolute"
            top="33px"
            left="0px"
            padding="0px 0px 0px 0px"
            whiteSpace="pre-wrap"
            children={note?.description}
            {...getOverrideProps(overrides, "description")}
          ></Text>
        </Flex>
        <Button
          width="unset"
          height="unset"
          justifyContent="flex-end"
          shrink="0"
          size="small"
          isDisabled={false}
          variation="default"
          children="Update"
          {...getOverrideProps(overrides, "UpdateButton")}
        ></Button>
      </Flex>
      {note?.imageSrc && <Flex
        gap="10px"
        direction="row"
        width="400px"
        height="unset"
        justifyContent="center"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 10px 0px 10px"
        {...getOverrideProps(overrides, "Frame 4")}
      >
        <Image
          width="unset"
          height="150px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          grow="1"
          shrink="1"
          basis="0"
          position="relative"
          padding="0px 0px 0px 0px"
          objectFit="contain"
          src={note?.imageSrc}
          {...getOverrideProps(overrides, "image")}
        ></Image>
      </Flex>}
      <Flex
        gap="10px"
        direction="column"
        width="400px"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 3")}
      >
        <Button
          width="unset"
          height="unset"
          shrink="0"
          size="small"
          isDisabled={false}
          variation="default"
          children="Delete"
          onClick={() => {
            deleteButtonOnClick();
          }}
          {...getOverrideProps(overrides, "DeleteButton")}
        ></Button>
      </Flex>
    </Flex>
  );
}
