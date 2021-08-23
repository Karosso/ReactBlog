import React from "react";
import { Modal } from "../../components/modal/Modal";
import { AddPost } from "./components/addPost/AddPost";
import { RenderPosts } from "./components/renderPosts/RenderPosts";
import style from "./Posts.module.scss";
import { UsePosts } from "./UsePosts";

function Posts() {
  const {
    filteredPosts,
    toggleAddModal,
    openAddPost,
    getOptionLabel,
    getOptionSelected,
    handleAddPost,
    onChangeAuthor,
    onChangeBody,
    onChangeTitle,
    openDeletePost,
    toggleDeleteModal,
    confirmDeletePost,
    deletePost,
  } = UsePosts();

  return (
    <div id={style.container}>
      <div>
        <h2>Posts</h2>
      </div>
      <RenderPosts
        postList={filteredPosts}
        toggleModal={toggleAddModal}
        deletePost={confirmDeletePost}
      />
      <Modal
        toggleModal={toggleAddModal}
        onConfirm={handleAddPost}
        open={openAddPost}
        title="Novo Post"
      >
        <AddPost
          getOptionLabel={getOptionLabel}
          getOptionSelected={getOptionSelected}
          onChangeAuthor={onChangeAuthor}
          onChangeBody={onChangeBody}
          onChangeTitle={onChangeTitle}
        />
      </Modal>

      <Modal
        toggleModal={toggleDeleteModal}
        onConfirm={deletePost}
        open={openDeletePost}
        title="Deletar Post ?"
      >
        <h3>Tem certeza que deseja deletar este Post?</h3>
      </Modal>
    </div>
  );
}

export default Posts;
