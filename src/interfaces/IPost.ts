import { IAuthorResponse } from "./IAuthor";

export interface IAddPostRequest {
  title: string;
  body: string;
}

export interface IPostResponse {
  id: number;
  title: string;
  body: string;
  creationDate: string;
  author: IAuthorResponse;
}