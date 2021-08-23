import React from "react";
import { Modal } from "../../components/modal/Modal";
import style from "./Authors.module.scss";
import { AddAuthor } from "./components/addAuthor/AddAuthor";
import { RenderAuthors } from "./components/renderAuthors/RenderAuthors";
import { UseAuthors } from "./UseAuthors";

function Authors() {
  const {
    filteredAuthors,
    openAddAuthor,
    toggleModal,
    toggleDeleteAuthor,
    deleteAuthor,
    openDeleteAuthor,
    confirmDeleteAuthor,
    onChangeBirthDate,
    onChangeName,
    onChangeNickname,
    handleAddAuthor
  } = UseAuthors();

  return (
    <div id={style.container}>
      <div>
        <h2>Autores</h2>
      </div>

      <RenderAuthors
        authorList={filteredAuthors}
        toggleModal={toggleModal}
        deleteAuthor={confirmDeleteAuthor}
      />
      <Modal
        toggleModal={toggleModal}
        onConfirm={handleAddAuthor}
        open={openAddAuthor}
        title="Novo Autor"
      >
        <AddAuthor
          onChangeBirthDate={onChangeBirthDate}
          onChangeName={onChangeName}
          onChangeNickname={onChangeNickname}
        />
      </Modal>

      <Modal
        toggleModal={toggleDeleteAuthor}
        onConfirm={deleteAuthor}
        open={openDeleteAuthor}
        title="Deletar Post ?"
      >
        <h3>Tem certeza que deseja deletar este Autor?</h3>
      </Modal>
    </div>
  );
}

export default Authors;
