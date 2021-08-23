import { TextField } from "@material-ui/core";
import React, { FC } from "react";
import style from "./AddAuthor.module.scss";

interface AddAuthorProps {
  onChangeBirthDate: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeName: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeNickname: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

export const AddAuthor: FC<AddAuthorProps> = ({
  onChangeBirthDate,
  onChangeName,
  onChangeNickname,
}) => {
  return (
    <div id={style.container}>
      <form>
        <TextField
          fullWidth={false}
          label="Nome"
          name="name"
          onChange={onChangeName}
        />

        <TextField
          fullWidth={false}
          label="Apelido"
          name="name"
          onChange={onChangeNickname}
        />

        <TextField
          label="Aniversário"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name="startDateString"
          onChange={onChangeBirthDate}
        />
      </form>
    </div>
  );
};
