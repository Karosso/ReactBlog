import { AxiosResponse } from "axios";
import { IPostResponse, IAddPostRequest } from "./IPost";

export interface IPostsApi {
  getPosts: (authorName?: string) => Promise<AxiosResponse<IPostResponse[]>>;
  addPost: (authorId: number, post: IAddPostRequest) => Promise<AxiosResponse<IPostResponse>>;
  removePost: (postId: number) => Promise<AxiosResponse<any>>;
}