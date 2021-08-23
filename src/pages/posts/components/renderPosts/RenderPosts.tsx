import React, { FC } from "react";
import { IPostResponse } from "../../../../interfaces/IPost";
import style from "./RenderPosts.module.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import { Button } from "@material-ui/core";
import ReactLogo from "../../../../components/reactLogo/ReactLogo";

interface RenderPostsProps {
  postList: IPostResponse[] | undefined;
  toggleModal: () => void;
  deletePost: (postId: number) => void;
}

export const RenderPosts: FC<RenderPostsProps> = ({
  postList,
  toggleModal,
  deletePost,
}) => {
  const renderPost = (post: IPostResponse, key: number) => (
    <div key={key} className={style.post}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div>
        <p>
          <b>Autor: </b>
          {post.author.name}
        </p>
        <p>
          <b>Apelido: </b>
          {post.author.nickname}
        </p>
        <p>
          <b>Data: </b>
          {new Date(post.creationDate).toLocaleString([], {
            timeStyle: "short",
            dateStyle: "short",
          })}
        </p>
      </div>

      <IconButton
        aria-label="delete"
        className={style.delete}
        onClick={() => deletePost(post.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div id={style.container}>
      {postList ? (
        !postList.length ? (
          <h4>Nenhum Post encontrado!</h4>
        ) : (
          postList.map(renderPost)
        )
      ) : (
        <ReactLogo width={300} />
      )}

      {postList && (
        <Button
          variant="contained"
          className={style.addPost}
          onClick={toggleModal}
        >
          Criar novo Post <b>+</b>
        </Button>
      )}
    </div>
  );
};
