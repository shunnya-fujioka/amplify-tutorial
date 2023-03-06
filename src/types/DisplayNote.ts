import { CreateNoteInput } from "../API";

export interface DisplayNote extends CreateNoteInput {
  // optional into required
  id: string;
  _version: number | null | undefined;
  // `Storage.get()`で取得した値を格納
  imageSrc?: string | null | undefined;
}