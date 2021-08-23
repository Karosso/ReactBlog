import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthorResponse } from "../../interfaces/IAuthor";
import { IPostResponse } from "../../interfaces/IPost";
import { AuthorsApi } from "../../services/authors/AuthorsApi";
import { PostsApi } from "../../services/posts/PostsApi";

interface IBlogContext {
  filteredAuthor: IAuthorResponse | undefined;
  filterAuthors: (author: IAuthorResponse) => void;
  filteredPosts: IPostResponse[] | undefined;
  filteredAuthors: IAuthorResponse[] | undefined;
  authors: IAuthorResponse[] | undefined;
  refreshPosts: () => Promise<void>;
  refreshAuthors: () => Promise<void>;
}

const BlogContext = createContext<IBlogContext>({} as IBlogContext);

export const BlogProvider: FC = ({ children }) => {
  const { getPosts } = PostsApi();
  const { getAuthors } = AuthorsApi();
  const [filteredAuthor, setFilter] = useState<IAuthorResponse>();
  const [posts, setPosts] = useState<IPostResponse[]>();
  const [filteredPosts, setFilteredPosts] = useState<IPostResponse[]>();
  const [authors, setAuthors] = useState<IAuthorResponse[]>();
  const [filteredAuthors, setFilteredAuthors] = useState<IAuthorResponse[]>();

  useEffect(() => {
    if (filteredAuthor?.id) {
      setFilteredPosts(
        posts?.filter((post) => post.author.id === filteredAuthor.id)
      );
      setFilteredAuthors(
        authors?.filter((author) => author.id === filteredAuthor.id)
      );
    } else {
      setFilteredPosts(posts);
      setFilteredAuthors(authors);
    }
  }, [filteredAuthor, posts, authors]);

  useEffect(() => {
    (async () => {
      try {
        const { data: posts } = await getPosts();
        setPosts(posts);
        setFilteredPosts(posts);

        const { data: authors } = await getAuthors();
        setAuthors(authors);
        setFilteredAuthors(authors);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const refreshPosts = async () => {
    try {
      const { data: posts } = await getPosts();
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshAuthors = async () => {
    try {
      const { data: posts } = await getAuthors();
      setAuthors(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const filterAuthors = (author: IAuthorResponse) => {
    setFilter(author);
  };

  return (
    <BlogContext.Provider
      value={{
        filteredAuthor,
        filterAuthors,
        filteredPosts,
        filteredAuthors,
        authors,
        refreshPosts,
        refreshAuthors,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  return context;
};
