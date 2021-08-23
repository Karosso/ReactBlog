import { TextField } from "@material-ui/core";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import React, { FC } from "react";
import { useBlogContext } from "../../../../contexts/blog/BlogContext";
import { IAuthorResponse } from "../../../../interfaces/IAuthor";
import style from "./AddPost.module.scss";

interface AddPostsProps {
  getOptionLabel: (option: IAuthorResponse) => string;
  getOptionSelected: any;
  onChangeAuthor: (
    _event: React.ChangeEvent<{}>,
    value: string | IAuthorResponse | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<IAuthorResponse> | undefined
  ) => void;
  onChangeBody: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeTitle: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const AddPost: FC<AddPostsProps> = ({
  getOptionLabel,
  getOptionSelected,
  onChangeAuthor,
  onChangeBody,
  onChangeTitle,
}) => {
  const { authors } = useBlogContext();

  return (
    <div id={style.container}>
      <form>
        <Autocomplete
          freeSolo
          getOptionSelected={getOptionSelected}
          getOptionLabel={getOptionLabel}
          options={authors || []}
          onChange={onChangeAuthor}
          renderInput={(params) => (
            <TextField {...params} label="Autor" variant="standard" />
          )}
        />

        <TextField
          fullWidth={false}
          label="Título"
          name="name"
          onChange={onChangeTitle}
        />
        <TextField
          fullWidth={false}
          label="Post"
          multiline
          variant="outlined"
          rows={5}
          name="name"
          onChange={onChangeBody}
        />
      </form>
    </div>
  );
};
