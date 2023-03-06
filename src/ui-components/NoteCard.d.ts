/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Note } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, ImageProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteCardOverridesProps = {
    NoteCard?: PrimitiveOverrideProps<FlexProps>;
    "Frame 2"?: PrimitiveOverrideProps<FlexProps>;
    "Group 1"?: PrimitiveOverrideProps<FlexProps>;
    name?: PrimitiveOverrideProps<TextProps>;
    description?: PrimitiveOverrideProps<TextProps>;
    UpdateButton?: PrimitiveOverrideProps<ButtonProps>;
    "Frame 4"?: PrimitiveOverrideProps<FlexProps>;
    image?: PrimitiveOverrideProps<ImageProps>;
    "Frame 3"?: PrimitiveOverrideProps<FlexProps>;
    DeleteButton?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type NoteCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    note?: Note;
} & {
    overrides?: NoteCardOverridesProps | undefined | null;
}>;
export default function NoteCard(props: NoteCardProps): React.ReactElement;
