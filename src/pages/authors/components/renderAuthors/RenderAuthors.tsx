import React, { FC } from "react";
import style from "./RenderAuthors.module.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { Button } from "@material-ui/core";
import ReactLogo from "../../../../components/reactLogo/ReactLogo";
import { IAuthorResponse } from "../../../../interfaces/IAuthor";

interface RenderAuthorProps {
  authorList: IAuthorResponse[] | undefined;
  toggleModal: () => void;
  deleteAuthor: (postId: number) => void;
}

export const RenderAuthors: FC<RenderAuthorProps> = ({
  authorList,
  toggleModal,
  deleteAuthor,
}) => {
  const renderAuthor = (author: IAuthorResponse, key: number) => (
    <div key={key} className={style.author}>
      <h3>{author.name}</h3>

      <div>
        <p>
          <b>Nome: </b>
          {author.name}
        </p>

        <p>
          <b>Apelido: </b>
          {author.nickname}
        </p>

        <p>
          <b>Aniversário: </b>
          {new Date(author.birthDate).toLocaleString([], {
            timeStyle: "short",
            dateStyle: "short",
          })}
        </p>

        <p>
          <b>Postagens: </b>
          {author.posts.length}
        </p>
      </div>

      <IconButton
        aria-label="delete"
        className={style.delete}
        onClick={() => deleteAuthor(author.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div id={style.container}>
      {authorList ? (
        !authorList.length ? (
          <h4>Nenhum Autor encontrado!</h4>
        ) : (
          authorList.map(renderAuthor)
        )
      ) : (
        <ReactLogo width={300} />
      )}

      {authorList && (
        <Button
          variant="contained"
          className={style.addAuthor}
          onClick={toggleModal}
        >
          Adicionar novo Autor <b>+</b>
        </Button>
      )}
    </div>
  );
};
