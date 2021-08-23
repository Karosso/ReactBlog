import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@material-ui/lab";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useBlogContext } from "../../contexts/blog/BlogContext";
import { useUi } from "../../contexts/ui/UiContext";
import { IAuthorResponse } from "../../interfaces/IAuthor";
import { IPostResponse } from "../../interfaces/IPost";
import { PostsApi } from "../../services/posts/PostsApi";

interface IUsePosts {
  filteredPosts: IPostResponse[] | undefined;
  toggleAddModal: () => void;
  openAddPost: boolean;
  handleAddPost: () => Promise<void>;
  onChangeTitle: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChangeBody: (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  getOptionSelected: (
    option: IAuthorResponse,
    value: IAuthorResponse
  ) => boolean;
  getOptionLabel: (option: IAuthorResponse) => string;
  onChangeAuthor: (
    _event: React.ChangeEvent<{}>,
    value: string | IAuthorResponse | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<IAuthorResponse> | undefined
  ) => void;
  openDeletePost: boolean;
  toggleDeleteModal: () => void;
  confirmDeletePost: (postId: number) => void;
  deletePost: () => Promise<void>;
}

export const UsePosts = (): IUsePosts => {
  const { filteredPosts, refreshPosts, authors, refreshAuthors } = useBlogContext();
  const { addPost, removePost } = PostsApi();
  const { setLoading } = useUi();
  const [openAddPost, setOpenAddPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number>();
  const [author, setAuthor] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const history = useHistory();

  const toggleDeleteModal = () => {
    setOpenDeletePost(!openDeletePost);
  };

  const confirmDeletePost = (postId: number) => {
    toggleDeleteModal();
    setDeletePostId(postId);
  };

  const deletePost = async () => {
    if (deletePostId) {
      setOpenDeletePost(false);
      setLoading(true);
      try {
        await removePost(deletePostId);
        refreshPosts();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddPost = async () => {
    if (author && title && body) {
      setOpenAddPost(false);
      setLoading(true);
      try {
        await addPost(author, { body, title });
        refreshPosts();
        refreshAuthors();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onChangeTitle = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(evt.target.value);
  };

  const onChangeBody = (
    evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setBody(evt.target.value);
  };

  const getOptionSelected = (
    option: IAuthorResponse,
    value: IAuthorResponse
  ) => {
    return option.name === value.name;
  };

  const getOptionLabel = (option: IAuthorResponse) => option.name;

  const onChangeAuthor = (
    _event: React.ChangeEvent<{}>,
    value: string | IAuthorResponse | null,
    _reason: AutocompleteChangeReason,
    _details?: AutocompleteChangeDetails<IAuthorResponse> | undefined
  ) => {
    if (typeof value === "object") {
      setAuthor(value?.id);
    }
  };

  const toggleAddModal = () => {
    if (authors && authors?.length > 0){
      setOpenAddPost(!openAddPost);
    } else {
      history.push("autores");
    }
  };

  return {
    filteredPosts,
    toggleAddModal,
    openAddPost,
    handleAddPost,
    onChangeTitle,
    onChangeBody,
    getOptionSelected,
    getOptionLabel,
    onChangeAuthor,
    openDeletePost,
    toggleDeleteModal,
    confirmDeletePost,
    deletePost,
  };
};
