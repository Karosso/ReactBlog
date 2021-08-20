import { IAddPostRequest, IPostResponse } from "../../interfaces/IPost";
import { IPostsApi } from "../../interfaces/IPostsApi";
import { api } from "../api/Api"

export const PostsApi = (): IPostsApi => {

  /**
   * @param authorName optional for filter
   * @returns List of Posts
   */
  const getPosts = async (authorName?: string) => {
    const query = authorName ? `?authorName=${authorName}` : ''
    return await api.get<IPostResponse[]>(`api/v1/posts${query}`);
  }

  /**
   * @param authorId Id of the post creator
   * @param post Title and body
   * @returns Post Saved data
   */
  const addPost = async (authorId: number, post: IAddPostRequest) => {
    return await api.post<IPostResponse>(`api/v1/authors/${authorId}/posts`, {...post});
  }

  /**
   * @param postId number
   * @returns Promise<void>
   */
  const removePost = async (postId: number) => {
    return await api.delete(`api/v1/posts/${postId}`);
  }

  return {
    addPost,
    getPosts,
    removePost,
  }
}