import { IPostResponse } from "./IPost";

export interface IAddAuthorRequest {
  name: string;
  nickname: string;
  /**
   * AAAA-MM-DD
   */
  birthDate: string;
}

export interface IAuthorResponse {
  id: number;
  name: string;
  nickname: string;
  birthDate: string;
  posts: IPostResponse[];
}