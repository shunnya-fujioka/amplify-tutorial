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
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import NoteCard from "./NoteCard";
import { Collection } from "@aws-amplify/ui-react";
export default function NoteCardCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Note,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    setItems(itemsDataStore);
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="grid"
      searchPlaceholder="Search..."
      templateColumns="1fr 1fr"
      autoFlow="row"
      alignItems="top"
      justifyContent="center"
      items={items || []}
      {...getOverrideProps(overrides, "NoteCardCollection")}
      {...rest}
    >
      {(item, index) => (
        <NoteCard
          note={item}
          height="auto"
          width="420px"
          margin="3px 3px 3px 3px"
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></NoteCard>
      )}
    </Collection>
  );
}
