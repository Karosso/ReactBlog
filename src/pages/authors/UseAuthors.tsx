import { useState } from "react";
import { useBlogContext } from "../../contexts/blog/BlogContext";
import { useUi } from "../../contexts/ui/UiContext";
import { IAuthorResponse } from "../../interfaces/IAuthor";
import { AuthorsApi } from "../../services/authors/AuthorsApi";

interface IUseAuthors {
  filteredAuthors: IAuthorResponse[] | undefined;
  openAddAuthor: boolean;
  toggleModal: () => void;
  toggleDeleteAuthor: () => void;
  deleteAuthor: () => Promise<void>;
  openDeleteAuthor: boolean;
  confirmDeleteAuthor: (AuthorId: number) => void;
  onChangeName: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeNickname: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeBirthDate: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleAddAuthor: () => Promise<void>;
}

export const UseAuthors = (): IUseAuthors => {
  const { setLoading } = useUi();
  const { removeAuthor, addAuthor } = AuthorsApi();
  const { filteredAuthors, refreshAuthors, refreshPosts } = useBlogContext();
  const [openAddAuthor, setOpenAddAuthor] = useState(false);
  const [name, setName] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const [birthDate, setBirthDate] = useState<string>();
  const [openDeleteAuthor, setOpenDeleteAuthor] = useState(false);
  const [deleteAuthorId, setDeleteAuthorId] = useState<number>();

  const onChangeName = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(evt.target.value);
  };

  const onChangeNickname = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNickname(evt.target.value);
  };

  const onChangeBirthDate = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setBirthDate(evt.target.value);
  };

  const toggleModal = () => {
    setOpenAddAuthor(!openAddAuthor);
  };

  const toggleDeleteAuthor = () => {
    setOpenDeleteAuthor(!openDeleteAuthor);
  };

  const handleAddAuthor = async () => {
    if (name && nickname && birthDate) {
      setOpenAddAuthor(false);
      setLoading(true);
      try {
        await addAuthor({ birthDate, name, nickname });
        refreshAuthors();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteAuthor = async () => {
    if (deleteAuthorId) {
      setOpenDeleteAuthor(false);
      setLoading(true);
      try {
        await removeAuthor(deleteAuthorId);
        refreshAuthors();
        refreshPosts();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmDeleteAuthor = (AuthorId: number) => {
    toggleDeleteAuthor();
    setDeleteAuthorId(AuthorId);
  };

  return {
    filteredAuthors,
    openAddAuthor,
    toggleModal,
    toggleDeleteAuthor,
    deleteAuthor,
    openDeleteAuthor,
    confirmDeleteAuthor,
    onChangeName,
    onChangeNickname,
    onChangeBirthDate,
    handleAddAuthor,
  };
};
